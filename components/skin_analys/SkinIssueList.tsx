import { View, Text, StyleSheet } from "react-native";

export default function SkinIssueList({ result }: { result: any }) {
  const issues = Object.entries(result).filter(
    ([_, v]: any) => v?.value === 1
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Issues</Text>

      {issues.map(([key], index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>{key.replace(/_/g, " ")}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  item: {
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
  },
});
