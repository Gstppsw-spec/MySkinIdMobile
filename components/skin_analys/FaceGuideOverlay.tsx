import { View, Text, StyleSheet, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const GUIDE_SIZE = width * 0.65;

export default function FaceGuideOverlay() {
  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Top Mask */}
      <View style={[styles.mask, { height: "20%" }]} />

      <View style={styles.middle}>
        <View style={styles.mask} />

        {/* FACE GUIDE */}
        <View style={styles.guideContainer}>
          <View style={styles.faceGuide} />
          <View style={styles.hint}>
            <Ionicons name="person-outline" size={18} color="#FFF" />
            <Text style={styles.hintText}>Posisikan wajah di dalam frame</Text>
          </View>
        </View>

        <View style={styles.mask} />
      </View>

      {/* Bottom Mask */}
      <View style={[styles.mask, { height: "20%" }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  mask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  middle: {
    flexDirection: "row",
    height: GUIDE_SIZE,
  },
  guideContainer: {
    width: GUIDE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  faceGuide: {
    width: GUIDE_SIZE,
    height: GUIDE_SIZE,
    borderRadius: GUIDE_SIZE / 2,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  hint: {
    position: "absolute",
    bottom: -30,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  hintText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600"
  },
});
