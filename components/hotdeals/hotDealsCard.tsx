import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAddCartService } from "@/api/cart";

interface Props {
  item: any;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 280;

const HotDealCard: React.FC<Props> = ({ item }) => {
  const location = item.location;
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
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl }}
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
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{5}</Text>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="#FF512F" />
          <Text style={styles.locationText} numberOfLines={2}>
            {location?.name} • {location?.district}
          </Text>
        </View>

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
        <TouchableOpacity
          style={[styles.button, styles.buttonCart]}
          onPress={handleAddCartProduct}
        >
          <Ionicons
            name={"cart-outline"}
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>{"Tambah Keranjang"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HotDealCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginRight: 20,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    overflow: "hidden",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: CARD_HEIGHT - 110,
  },

  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF512F",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },

  ratingBox: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 14,
  },

  ratingText: {
    color: "#FFD700",
    marginLeft: 4,
    fontWeight: "600",
    fontSize: 12,
  },

  bottomContent: {
    padding: 12,
    backgroundColor: "#FFF",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },

  locationText: {
    color: "#555",
    fontSize: 12,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },

  priceDiscount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF512F",
  },

  priceNormal: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#999",
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  buttonConsult: {
    backgroundColor: "#7C3AED",
  },
  buttonCart: {
    backgroundColor: "#FF7043",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});
