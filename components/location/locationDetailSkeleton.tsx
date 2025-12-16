import React from "react";
import { View, Dimensions } from "react-native";
import Skeleton from "../skeleton/skeleton";

const { width } = Dimensions.get("window");

export default function ClinicDetailSkeleton() {
  return (
    <View>
      {/* Gambar utama */}
      <Skeleton width={width} height={250} />

      {/* Gallery Skeleton */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <Skeleton width={width - 32} height={120} style={{ marginBottom: 12 }} />
        <Skeleton width={width - 32} height={120} />
      </View>

      {/* Clinic Info */}
      <View style={{ padding: 16 }}>
        <Skeleton width={200} height={24} style={{ marginBottom: 12 }} />
        <Skeleton width={width - 32} height={18} style={{ marginBottom: 8 }} />
        <Skeleton width={width - 80} height={18} />
      </View>

      {/* Service Tabs */}
      <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <Skeleton width={120} height={40} style={{ marginBottom: 10 }} />
        <Skeleton width={width - 32} height={80} />
      </View>
    </View>
  );
}
