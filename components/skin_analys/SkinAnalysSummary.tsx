import { View, Text, Image, StyleSheet } from "react-native";

export default function SkinAnalysSummary({ imageUrl }: { imageUrl: string }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>Hasil Analisis Kulit</Text>
      <Text style={styles.subtitle}>AI Skin Detection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
});
