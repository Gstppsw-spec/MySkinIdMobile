import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type TabType = "Product" | "Services" | "Shop";

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

const SearchTabs: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const tabs: TabType[] = ["Product", "Services", "Shop"]; // ✅ tipe eksplisit

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onChangeTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#7C3AED",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#7C3AED",
    fontWeight: "700",
  },
});

export default SearchTabs;
