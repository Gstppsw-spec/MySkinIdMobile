import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function LoadingOverlay({ visible }: { visible: boolean }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacity.setValue(0);
      scale.setValue(0.95);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.box, { transform: [{ scale }] }]}>
        <Animated.Text style={styles.text}>Menganalisa kulit...</Animated.Text>
        <Text style={styles.sub}>Mohon tunggu sebentar</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  box: {
    backgroundColor: "#FFF",
    paddingVertical: 26,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: "center",
    minWidth: 220,
  },
  text: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  sub: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
});
