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
  compact?: boolean;
}

const { width } = Dimensions.get("window");

const HotDealCardProduct: React.FC<Props> = ({ item }) => {
  const formatSold = (sold: number) => {
    if (sold >= 1000) {
      return (sold / 1000).toFixed(1).replace(/\.0$/, "") + "rb+";
    }
    return sold.toString();
  };

  const cartProductMutation = useAddCartProduct();

  const handlePress = () =>
    router.push({
      pathname: "/product/[id]",
      params: {
        id: item.id.toString(),
      },
    });

  const imageUrl = item.images[0]
    ? item.images[0]?.imageUrl
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
      activeOpacity={0.9}
      style={styles.card}
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
            <Text style={styles.badgeText}>{item.discountPercent / 1}%</Text>
          </View>
        )}
        {item.needPrescription && (
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
            Rp
            {(
              item.price -
              (item.price * item.discountPercent) / 100
            ).toLocaleString()}
          </Text>
          <Text style={styles.normalPrice}>
            Rp {item.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFB800" />
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
            item.isPrescriptionRequired
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
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
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

export default HotDealCardProduct;

const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 300;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 20,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,

    borderWidth: 1,
    borderColor: "#F3F3F3",
    overflow: "hidden",
  },

  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 140,
  },

  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E53935",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  content: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF512F",
    marginRight: 8,
  },
  normalPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
  soldText: {
    fontSize: 12,
    color: "#666",
  },

  button: {
    paddingVertical: 8,
    borderRadius: 8,
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
    fontSize: 12,
    fontWeight: "700",
  },
  prescriptionBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(124, 58, 237, 0.9)", // ungu
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  prescriptionText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
});
