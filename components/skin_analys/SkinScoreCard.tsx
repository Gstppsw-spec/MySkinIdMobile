import { View, Text, StyleSheet } from "react-native";

export default function SkinScoreCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{Math.round(value * 100)}%</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    width: 100,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  title: {
    fontSize: 12,
    color: "#6B7280",
  },
});
