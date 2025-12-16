import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Skeleton from "../skeleton/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header Image */}
      <Skeleton width={"100%"} height={300} />

      <View style={{ padding: 16 }}>
        {/* Title */}
        <Skeleton width={"70%"} height={28} style={{ marginBottom: 12 }} />

        {/* Price */}
        <Skeleton width={"40%"} height={22} style={{ marginBottom: 8 }} />

        {/* Discount */}
        <Skeleton width={"30%"} height={20} style={{ marginBottom: 20 }} />

        {/* Product Info Blocks */}
        <Skeleton width={"100%"} height={80} style={{ marginBottom: 16 }} />

        {/* Description Title */}
        <Skeleton width={"50%"} height={22} style={{ marginBottom: 10 }} />

        {/* Description Content */}
        <Skeleton width={"100%"} height={80} style={{ marginBottom: 20 }} />
      </View>

      {/* Hot Deals Section */}
      <View style={{ paddingHorizontal: 16 }}>
        <Skeleton width={"60%"} height={26} style={{ marginBottom: 12 }} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              width={150}
              height={200}
              style={{ marginRight: 12, borderRadius: 12 }}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
