// components/profile/ProfileSection.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  isDark?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  isDark = false,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: "#444" }]}>{title}</Text>
      <View style={styles.childWrapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 20,
  },
  childWrapper: {
    gap: 6,
  },
});

export default ProfileSection;
