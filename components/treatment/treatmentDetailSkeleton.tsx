import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "../skeleton/skeleton";

export default function TreatmentDetailSkeleton() {
  return (
    <View>
      {/* Header Image / Title Placeholder */}
      <Skeleton width={"100%"} height={250} style={{ borderRadius: 0 }} />

      <View style={{ padding: 16 }}>
        {/* Title */}
        <Skeleton width={"60%"} height={22} style={{ marginBottom: 10 }} />

        {/* Price */}
        <Skeleton width={"40%"} height={20} style={{ marginBottom: 20 }} />

        {/* Description block */}
        <Skeleton width={"100%"} height={80} style={{ marginBottom: 30 }} />

        {/* Location Card */}
        <View style={styles.card}>
          <Skeleton width={"45%"} height={"100%"} />

          <View style={{ width: "55%", padding: 10 }}>
            <Skeleton width={"70%"} height={18} style={{ marginBottom: 8 }} />
            <Skeleton width={"50%"} height={14} />
          </View>
        </View>

        {/* Similar services title */}
        <Skeleton width={"50%"} height={20} style={{ marginTop: 30 }} />

        {/* Horizontal item list */}
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Skeleton width={120} height={160} style={{ marginRight: 12 }} />
          <Skeleton width={120} height={160} style={{ marginRight: 12 }} />
          <Skeleton width={120} height={160} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    height: 90,
    marginTop: 30,
  },
});
