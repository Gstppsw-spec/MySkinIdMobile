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
import { router } from "expo-router";

interface Category {
  id: number;
  name: string;
  description?: string;
  icon: string;
  treatmentCount: number;
}

const categories: Category[] = [
  { id: 1, name: "Dental Care", icon: "medical", treatmentCount: 12 },
  { id: 2, name: "Skin Treatment", icon: "body", treatmentCount: 8 },
  { id: 3, name: "Hair Treatment", icon: "cut", treatmentCount: 6 },
  { id: 4, name: "Aesthetic", icon: "sparkles", treatmentCount: 15 },
  { id: 5, name: "Massage Therapy", icon: "fitness", treatmentCount: 10 },
  { id: 6, name: "Laser Treatment", icon: "flash", treatmentCount: 7 },
];

export default function FilterCategoryAll() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedCategories(categories.map((c) => c.id));
  };

  const resetSelection = () => {
    setSelectedCategories([]);
  };

  const onClose = () => {
    router.back();
  };

  const renderItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategories.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => toggleCategory(item.id)}
      >
        <View style={styles.itemContent}>
          <Text style={[styles.itemText, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={16} color="#9B5DE5" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
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
            Bisa pilih lebih dari satu kategori
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={20}
          color="#9B5DE5"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Cari kategori treatment..."
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

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Semua kategori klinik</Text>
        <View style={styles.divider} />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footerButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.resetButton]}
          onPress={resetSelection}
        >
          <Ionicons name="refresh" size={18} color="#9B5DE5" />
          <Text style={styles.actionText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.selectAllButton]}
          onPress={selectAll}
        >
          <Ionicons name="checkmark-done" size={18} color="#FFF" />
          <Text style={[styles.actionText, { color: "#FFF" }]}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.selectAllButton]}
          onPress={() => router.back()}
        >
          <Ionicons name="apps" size={18} color="#FFF" />
          <Text style={[styles.actionText, { color: "#FFF" }]}>Apply</Text>
        </TouchableOpacity>
      </View>
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
  },
  subtitle: {
    fontSize: 12,
    color: "#8D6E63",
    textAlign: "center",
    marginTop: 4,
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
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A1887F",
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: "#E8D5BB",
    width: "100%",
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0EBE6",
  },
  selectedItem: {
    backgroundColor: "#EDE7F6",
    borderColor: "#9B5DE5",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5A189A",
  },
  selectedText: {
    color: "#9B5DE5",
    fontWeight: "700",
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#F3E8FF",
    marginRight: 8,
  },
  selectAllButton: {
    backgroundColor: "#9B5DE5",
    marginLeft: 8,
  },
  actionText: {
    fontWeight: "700",
    marginLeft: 6,
  },
});
