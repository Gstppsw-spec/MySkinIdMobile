import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const ProductInformation = ({
  price,
  discountPercent,
  priceDiscount,
  isPrescriptionRequired,
  name,
  rating,
  sold,
}: {
  price: number;
  discountPercent: number;
  priceDiscount: number;
  isPrescriptionRequired: boolean;
  name: string;
  rating: number;
  sold: number;
}) => {
  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#FF512F",
          }}
        >
          Rp {(
              price -
              (price * discountPercent) / 100
            ).toLocaleString()}
        </Text>

        {discountPercent > 0 && (
          <Text
            style={{
              marginLeft: 8,
              fontSize: 12,
              color: "#777",
              textDecorationLine: "line-through",
            }}
          >
            Rp {price.toLocaleString()}
          </Text>
        )}

        {discountPercent > 0 && (
          <View
            style={{
              backgroundColor: "#FFE4E0",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 6,
              marginLeft: 8,
            }}
          >
            <Text
              style={{
                color: "#FF512F",
                fontWeight: "700",
                fontSize: 12,
              }}
            >
              -{discountPercent/1}%
            </Text>
          </View>
        )}
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
      >
        <Ionicons name="star" size={16} color="#FFB800" />
        <Text style={{ marginLeft: 4, fontSize: 12 }}>{rating}</Text>
        <Text style={{ marginLeft: 10, color: "#666", fontSize: 12 }}>
          {sold} terjual
        </Text>
      </View>
      {isPrescriptionRequired && (
        <View
          style={{
            marginTop: 12,
            backgroundColor: "#FFF4E5",
            padding: 10,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#D18300",
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            ⚠ Produk ini membutuhkan resep dokter
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductInformation;
