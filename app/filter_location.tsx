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

interface Location {
  id: number;
  name: string;
  address?: string;
}

const locations: Location[] = [
  { id: 1, name: "Jakarta", address: "Jl. Sudirman No. 10" },
  { id: 2, name: "Bandung", address: "Jl. Thamrin No. 20" },
  { id: 3, name: "Surabaya", address: "Jl. Gatot Subroto No. 5" },
  { id: 4, name: "Medan", address: "Jl. Merdeka No. 15" },
  { id: 5, name: "Bali", address: "Jl. Raya Kuta No. 88" },
  { id: 6, name: "Yogyakarta", address: "Jl. Malioboro No. 123" },
];

export default function FilterLocation() {
  const [selectedLocation, setSelectedLocation] = useState<number | "nearMe">(
    "nearMe"
  );
  const [search, setSearch] = useState("");

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Location }) => {
    const isSelected = selectedLocation === item.id;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedLocation(item.id)}
      >
        <View style={styles.itemContent}>
          <View style={styles.locationIcon}>
            <Ionicons name="location-outline" size={20} color="#9B5DE5" />
          </View>
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

  const isOtherLocation = selectedLocation !== "nearMe";

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#5A189A" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pilih Lokasi Favorit Anda</Text>
          <Text style={styles.subtitle}>
            Temukan promo eksklusif di kota pilihan Anda
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={20}
          color="#8B7355"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Cari kota atau alamat..."
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

      {/* Near Me Option */}
      <TouchableOpacity
        style={[
          styles.item,
          styles.nearMeItem,
          selectedLocation === "nearMe" && styles.selectedItem,
        ]}
        onPress={() => setSelectedLocation("nearMe")}
      >
        <View style={styles.itemContent}>
          <View style={styles.locationIcon}>
            <Ionicons name="navigate" size={20} color="#9B5DE5" />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.itemText,
                selectedLocation === "nearMe" && styles.selectedText,
              ]}
            >
              Lokasi Terdekat
            </Text>
          </View>
        </View>
        {selectedLocation === "nearMe" && (
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kota Tersedia</Text>
        <View style={styles.divider} />
      </View>

      {/* List of locations */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Apply Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonApply,
            isOtherLocation ? styles.buttonActive : styles.buttonInactive,
          ]}
          disabled={!isOtherLocation}
          onPress={() => console.log("Location applied:", selectedLocation)}
        >
          <Text
            style={[
              styles.buttonText,
              isOtherLocation ? styles.textActive : styles.textInactive,
            ]}
          >
            TERAPKAN LOKASI
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isOtherLocation ? "#FFFFFF" : "#A1887F"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F5F0",
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
    shadowColor: "#A1887F",
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
    backgroundColor: "#F5F5F5",
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
    paddingVertical: 5,
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
    color: "#A1887F",
    fontWeight: "500",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8D6E63",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0EBE6",
    width: "100%",
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 16,
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
  nearMeItem: {
    marginHorizontal: 24,
  },
  selectedItem: {
    backgroundColor: "#9B5DE5",
    borderColor: "#9B5DE5",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F5F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A1887F",
    letterSpacing: 0.3,
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "700",
  },
  address: {
    fontSize: 13,
    color: "#A1887F",
    marginTop: 4,
    letterSpacing: 0.2,
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#5A189A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    padding: 10,
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
    fontSize: 14,
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
