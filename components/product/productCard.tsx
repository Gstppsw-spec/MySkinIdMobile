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
import { useAddCartProduct } from "@/api/cart";
import Toast from "react-native-toast-message";

interface Props {
  item: any;
}

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const CARD_HEIGHT = 260;

const ProductCard: React.FC<Props> = ({ item }) => {
  const cartProductMutation = useAddCartProduct();

  const formatSold = (sold: number) => {
    if (sold >= 1000)
      return (sold / 1000).toFixed(1).replace(/\.0$/, "") + "rb+";
    return sold.toString();
  };

  const handlePress = () =>
    router.push({
      pathname: "/product/[id]",
      params: { id: item.id.toString() },
    });

  const imageUrl = item.images[0]?.imageUrl
    ? item.images[0].imageUrl
    : "https://api.myskin.blog/uploads/4.jpg";

  const handleAddCartProduct = () => {
    const payload = {
      productId: item?.id,
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

  const handleToConsultation = () => {
    const payload = {};
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: CARD_WIDTH,
          marginBottom: 16,
        },
      ]}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        {item.discountPercent > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.discountPercent}%</Text>
          </View>
        )}

        {item.isPrescriptionRequired && (
          <View style={styles.prescriptionBadge}>
            <Ionicons name="medkit" size={12} color="#fff" />
            <Text style={styles.prescriptionText}>Butuh Resep</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.priceWrapper}>
          <Text style={styles.discountPrice}>
            Rp{" "}
            {(
              item.price -
              (item.discountPercent * item.price) / 100
            ).toLocaleString()}
          </Text>
          <Text style={styles.normalPrice}>
            Rp {item.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.soldText}> {formatSold(1000)} terjual</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            item.isPrescriptionRequired
              ? styles.buttonConsult
              : styles.buttonCart,
          ]}
          onPress={
            item?.isPrescriptionRequired
              ? handleToConsultation
              : handleAddCartProduct
          }
        >
          <Ionicons
            name={
              item.isPrescriptionRequired
                ? "chatbubble-ellipses-outline"
                : "cart-outline"
            }
            size={16}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.buttonText}>
            {item.isPrescriptionRequired
              ? "Mulai Konsultasi"
              : "Tambah Keranjang"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

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
  },
  imageWrapper: {
    width: "100%",
    height: CARD_HEIGHT * 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#E53935",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  prescriptionBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(124, 58, 237, 0.9)",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  prescriptionText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  content: {
    padding: 8,
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  discountPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF512F",
    marginRight: 6,
  },
  normalPrice: {
    fontSize: 10,
    color: "#888",
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 10,
    color: "#333",
    marginLeft: 2,
  },
  soldText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 4,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonConsult: {
    backgroundColor: "#7C3AED",
  },
  buttonCart: {
    backgroundColor: "#FF7043",
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
