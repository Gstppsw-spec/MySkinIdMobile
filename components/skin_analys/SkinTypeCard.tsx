import { View, Text, StyleSheet } from "react-native";

export default function SkinTypeCard({
  skinType,
  severity,
}: {
  skinType: string;
  severity: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Skin Type</Text>
      <Text style={styles.type}>{skinType.toUpperCase()}</Text>
      <Text style={styles.severity}>Severity: {severity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: "#EEF2FF",
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: "#4F46E5",
  },
  type: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
  severity: {
    fontSize: 12,
    color: "#6B7280",
  },
});
