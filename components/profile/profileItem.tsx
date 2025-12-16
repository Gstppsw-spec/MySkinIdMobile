import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  onPress?: () => void;
  isDark?: boolean;
  showArrow?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  icon,
  title,
  value,
  onPress,
  isDark = false,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: "#FFFFFF",
          borderColor: "#EEE",
        },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftSide}>
        <View style={[styles.iconWrapper, { backgroundColor: "#F1F4F8" }]}>
          <Ionicons
            name={icon}
            size={20}
            color={isDark ? "#4F46E5" : "#4F46E5"}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: "#111" }]}>{title}</Text>

          {value && (
            <Text style={[styles.value, { color: "#666" }]}>{value}</Text>
          )}
        </View>
      </View>

      {showArrow && onPress && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={isDark ? "#777" : "#AAA"}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
  },
  value: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default ProfileItem;
