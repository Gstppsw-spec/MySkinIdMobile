import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Skeleton from "../skeleton/skeleton";

export default function SkinAnalysSkeleton() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Image */}
      <Skeleton width="100%" height={220} style={styles.image} />

      {/* Summary */}
      <View style={styles.card}>
        <Skeleton width="60%" height={18} />
        <Skeleton width="100%" height={14} style={styles.mt} />
        <Skeleton width="90%" height={14} style={styles.mtSm} />
      </View>

      {/* Score Section */}
      <View style={styles.scoreRow}>
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.scoreBox}>
            <Skeleton width={40} height={40} style={styles.scoreCircle} />
            <Skeleton width="70%" height={12} />
          </View>
        ))}
      </View>

      {/* Skin Type */}
      <View style={styles.card}>
        <Skeleton width="40%" height={16} />
        <Skeleton width="80%" height={14} style={styles.mt} />
      </View>

      {/* Issue List */}
      <View style={styles.card}>
        <Skeleton width="50%" height={16} />
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} width="100%" height={14} style={styles.mt} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  mt: {
    marginTop: 8,
  },
  mtSm: {
    marginTop: 6,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  scoreBox: {
    width: "30%",
    alignItems: "center",
  },
  scoreCircle: {
    borderRadius: 20,
    marginBottom: 8,
  },
});
