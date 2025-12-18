import { View, StyleSheet } from "react-native";
import SkinScoreCard from "./SkinScoreCard";

export default function SkinScoreSection({
  acne,
  wrinkle,
  oil,
}: {
  acne: number;
  wrinkle: number;
  oil: number;
}) {
  return (
    <View style={styles.container}>
      <SkinScoreCard title="Acne" value={acne} />
      <SkinScoreCard title="Wrinkle" value={wrinkle} />
      <SkinScoreCard title="Oil" value={oil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
});
