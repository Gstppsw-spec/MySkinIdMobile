import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const TreatmentInformation = ({ items }: any) => {
  return (
    <View>
      {/* Nama treatment */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>{items?.name}</Text>
      </View>

      {/* Harga dan diskon */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#FF512F",
          }}
        >
          Rp { (items?.normalPrice - ((items?.normalPrice * items?.discountPercent)/100)).toLocaleString()}
        </Text>

        {items?.discountPercent > 0 && (
          <Text
            style={{
              marginLeft: 8,
              fontSize: 12,
              color: "#777",
              textDecorationLine: "line-through",
            }}
          >
            Rp {(items?.normalPrice / 1).toLocaleString()}
          </Text>
        )}

        {items?.discountPercent > 0 && (
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
              -{items?.discountPercent}%
            </Text>
          </View>
        )}
      </View>

      {/* Duration */}
      {items?.duration && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="time-outline" size={16} color="#777" />
          <Text style={{ marginLeft: 4, fontSize: 12, color: "#777" }}>
            Durasi: {items.duration}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TreatmentInformation;
