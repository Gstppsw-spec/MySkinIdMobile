import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TreatmentActionButton from "./treatmentActiion";
import Toast from "react-native-toast-message";
import { useAddCartService } from "@/api/cart";

interface Props {
  item: any;
}

const CARD_HEIGHT = 240;

const TreatmentCard: React.FC<Props> = ({ item }) => {
  const location = item.location;
  const imageUrl = item?.imageUrl;
  const cartProductMutation = useAddCartService();

  const handlePress = () =>
    router.push({
      pathname: "/treatment/[id]",
      params: { id: item.id.toString() },
    });

  const handleAddCartProduct = () => {
    const payload = {
      serviceId: item?.id,
    };

    cartProductMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil menambahkan product ke cart",
        });
      },
      onError: (err) => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menambahkan product ke cart",
        });
      },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card]}
      onPress={handlePress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {item.discountPercent > 0 && (
          <View style={styles.badge}>
            <Ionicons name="flame" size={14} color="#fff" />
            <Text style={styles.badgeText}>{item.discountPercent}% OFF</Text>
          </View>
        )}

        <View style={styles.ratingBox}>
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text style={styles.ratingText}>{5}</Text>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        {item.location && (
          <View style={styles.locationRow}>
            <Ionicons name="location" size={10} color="#FF512F" />
            <Text style={styles.locationText} numberOfLines={1}>
              {location?.name} • {location?.district}
            </Text>
          </View>
        )}

        <View style={styles.priceRow}>
          {item.discountPercent > 0 ? (
            <>
              <Text style={styles.priceDiscount}>
                Rp
                {(
                  item.normalPrice -
                  (item.normalPrice * item.discountPercent) / 100
                ).toLocaleString()}
              </Text>
              <Text style={styles.priceNormal}>
                Rp {(item.normalPrice / 1).toLocaleString()}
              </Text>
            </>
          ) : (
            <Text style={styles.priceDiscount}>
              Rp {(item.normalPrice / 1).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      <TreatmentActionButton
        padding={10}
        fontSize={10}
        paddingVertical={10}
        handleAddCartProduct={handleAddCartProduct}
      />
    </TouchableOpacity>
  );
};

export default TreatmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,

    overflow: "hidden",
    marginBottom: 10,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: CARD_HEIGHT - 100,
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF512F",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 16,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4,
  },

  ratingBox: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },

  ratingText: {
    color: "#FFD700",
    marginLeft: 4,
    fontSize: 10,
    fontWeight: "600",
  },

  bottomContent: {
    padding: 10,
    backgroundColor: "#FFF",
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },

  locationText: {
    color: "#555",
    fontSize: 11,
    flex: 1,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },

  priceDiscount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF512F",
  },

  priceNormal: {
    fontSize: 10,
    textDecorationLine: "line-through",
    color: "#999",
  },
});
