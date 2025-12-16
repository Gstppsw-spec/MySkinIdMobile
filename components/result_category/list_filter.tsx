import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface FilterItem {
  id: number;
  name: string;
}

interface ListFilterProps {
  list_filter: FilterItem[];
  onPricePress: (id: number) => void;
}

const ListFilter: React.FC<ListFilterProps> = ({
  list_filter,
  onPricePress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#5A189A" />
        </TouchableOpacity>
        {list_filter?.length > 0 &&
          list_filter.map((item: FilterItem, index: number) => (
            <TouchableOpacity
              key={item.id}
              style={styles.filterButton}
              activeOpacity={0.7}
              onPress={() => onPricePress(item.id)}
            >
              <Text style={styles.filterText}>{item.name}</Text>
              <FontAwesome name="chevron-down" size={12} color="#666" />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default ListFilter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#F8F5F0",
    marginTop: 80,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
});
