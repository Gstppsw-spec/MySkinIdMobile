import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Skeleton from "../skeleton/skeleton";

const { width } = Dimensions.get("window");

export default function HomeSkeleton() {
  return (
    <View style={styles.container}>
      {/* Carousel Skeleton */}
      <Skeleton width={width} height={180} style={styles.carousel} />

      {/* Category Consultation */}
      <View style={styles.section}>
        <Skeleton width={160} height={20} />
        <View style={styles.row}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} width={70} height={70} style={styles.circle} />
          ))}
        </View>
      </View>

      {/* Hot Deals Treatment */}
      <View style={styles.section}>
        <Skeleton width={220} height={20} />
        <View style={styles.horizontal}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={140} height={180} style={styles.card} />
          ))}
        </View>
      </View>

      {/* Hot Deals Product */}
      <View style={styles.section}>
        <Skeleton width={220} height={20} />
        <View style={styles.horizontal}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={140} height={180} style={styles.card} />
          ))}
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Skeleton width={200} height={20} />
        {[1, 2].map((i) => (
          <Skeleton key={i} width="100%" height={90} style={styles.location} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginTop: 20,
  },
  carousel: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  circle: {
    borderRadius: 35,
  },
  horizontal: {
    flexDirection: "row",
    marginTop: 16,
  },
  card: {
    marginRight: 12,
    borderRadius: 16,
  },
  location: {
    marginTop: 12,
    borderRadius: 16,
  },
});
