import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReviewComponent = ({
  reviews,
  rating,
}: {
  reviews: any[];
  rating: number;
}) => {
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#333",
          }}
        >
          Ulasan
        </Text>

        <Text
          style={{
            marginLeft: 6,
            fontSize: 13,
            fontWeight: "600",
            color: "#7C3AED",
          }}
        >
          ⭐ {rating}
        </Text>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontWeight: "600", fontSize: 11 }}>
                  {item.name}
                </Text>

                <View style={{ flexDirection: "row", marginTop: 2 }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" size={10} color="#FFC107" />
                  ))}
                </View>
              </View>
            </View>

            <Text style={{ marginTop: 8, fontSize: 11, color: "#555" }}>
              {item.review}
            </Text>

            {item.images?.length > 0 && (
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {item.images.map((img: string, i: number) => (
                  <Image
                    key={i}
                    source={{ uri: img }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                  />
                ))}
              </View>
            )}
          </View>
        )}
        scrollEnabled={false}
        nestedScrollEnabled
      />
    </View>
  );
};

export default ReviewComponent;
