import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductActionButton = ({
  isPrescriptionRequired,
  handleAddCartProduct
}: {
  isPrescriptionRequired: boolean;
  handleAddCartProduct: () => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
      onPress={handleAddCartProduct}
        style={[styles.button, isPrescriptionRequired ? styles.consult : styles.cart]}
      >
        <Ionicons
          name={
            isPrescriptionRequired ? "chatbubble-ellipses-outline" : "cart-outline"
          }
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />

        <Text style={styles.text}>
          {isPrescriptionRequired ? "Mulai Konsultasi" : "Tambah Keranjang"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  cart: {
    backgroundColor: "#FF7043",
  },
  consult: {
    backgroundColor: "#7C3AED",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default ProductActionButton;
