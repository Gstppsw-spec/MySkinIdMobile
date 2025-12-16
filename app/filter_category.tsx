import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import useStore from "@/store/useStore";
import { useMainCategory } from "@/api/category";

interface Category {
  id: number;
  name: string;
  description?: string;
  icon: string;
  treatmentCount: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Dental Care",
    description: "Perawatan gigi dan mulut profesional",
    icon: "medical",
    treatmentCount: 12,
  },
  {
    id: 2,
    name: "Skin Treatment",
    description: "Perawatan kulit wajah dan tubuh",
    icon: "body",
    treatmentCount: 8,
  },
  {
    id: 3,
    name: "Hair Treatment",
    description: "Perawatan rambut dan kulit kepala",
    icon: "cut",
    treatmentCount: 6,
  },
  {
    id: 4,
    name: "Aesthetic",
    description: "Treatmen kecantikan dan estetika",
    icon: "sparkles",
    treatmentCount: 15,
  },
  {
    id: 5,
    name: "Massage Therapy",
    description: "Pijat terapi dan relaksasi",
    icon: "fitness",
    treatmentCount: 10,
  },
  {
    id: 6,
    name: "Laser Treatment",
    description: "Perawatan dengan teknologi laser",
    icon: "flash",
    treatmentCount: 7,
  },
];

export default function FilterCategory() {
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  );
  const [search, setSearch] = useState("");

  const mainCategoryId = useStore(
    (state: { mainCategoryId: string }) => state.mainCategoryId
  );

  const { data, isLoading } = useMainCategory(mainCategoryId);

  const filteredCategories = data?.subservicecategory?.filter((category: any) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => {
          setSelectedCategory(item.id);
          router.push("/filter_result");
        }}
      >
        <View style={styles.itemContent}>
          <View style={styles.textContainer}>
            <Text style={[styles.itemText, isSelected && styles.selectedText]}>
              {item.name}
            </Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={16} color="#FFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const onClose = () => {
    router.back();
  };

  const isCategorySelected = selectedCategory !== "all";

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5F0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#5A189A" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pilih Kategori Treatment</Text>
          <Text style={styles.subtitle}>
            Temukan layanan terbaik sesuai kebutuhan Anda
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={20}
          color="#9B5DE5"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder={`Cari Kategory ${data?.name} ...`}
          placeholderTextColor="#A1887F"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color="#A1887F" />
          </TouchableOpacity>
        )}
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Semua Kategori {data?.name}</Text>
        <View style={styles.divider} />
      </View>

      {/* List of categories */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    color: "#A1887F",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: "#8D6E63",
    textAlign: "center",
    marginTop: 4,
    letterSpacing: 0.3,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F0EBE6",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#5A189A",
    fontWeight: "500",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A1887F",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  divider: {
    height: 2,
    backgroundColor: "#E8D5BB",
    width: "100%",
    borderRadius: 1,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0EBE6",
  },
  allCategoriesItem: {
    marginHorizontal: 24,
  },
  selectedItem: {
    backgroundColor: "#9B5DE5",
    borderColor: "#9B5DE5",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#E8D5BB",
  },
  selectedIcon: {
    backgroundColor: "#7B2CBF",
    borderColor: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A1887F",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    color: "#8D6E63",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  selectedDescription: {
    color: "#E8D5BB",
  },
  treatmentCount: {
    backgroundColor: "rgba(155, 93, 229, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  countText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9B5DE5",
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonApply: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#9B5DE5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonInactive: {
    backgroundColor: "#F5F5F5",
  },
  buttonActive: {
    backgroundColor: "#9B5DE5",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
  textInactive: {
    color: "#A1887F",
  },
  textActive: {
    color: "#FFFFFF",
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
