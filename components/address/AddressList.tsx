import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import AddressCard from "./AddressCard";
import { router } from "expo-router";

interface AddressListProps {
  addresses: Array<{
    id: string;
    name: string;
    phone: string;
    address: string;
    note?: string;
  }>;
}

export default function AddressList({ addresses }: AddressListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AddressCard {...item} />}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/address/addAddress")}
      >
        <Text style={styles.addButtonText}>+ Tambah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90, // space for floating button
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,

    backgroundColor: "#7C3AED",
    paddingVertical: 14,
    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
