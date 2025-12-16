import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  padding: number;
  fontSize: number;
  paddingVertical: number;
  handleAddCartProduct?: () => void;
}

const TreatmentActionButton = ({
  padding,
  fontSize,
  paddingVertical,
  handleAddCartProduct,
}: Props) => {
  return (
    <View style={[styles.wrapper, { padding: padding }]}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.cartButton,
          { paddingVertical: paddingVertical },
        ]}
        onPress={handleAddCartProduct}
      >
        <Ionicons
          name={"cart-outline"}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.text, { fontSize: fontSize }]}>
          {"Tambah Keranjang"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.buyButton,
          { paddingVertical: paddingVertical },
        ]}
      >
        <Ionicons
          name={"bag-handle-outline"}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.text, { fontSize: fontSize }]}>
          {"Beli Sekarang"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cartButton: {
    backgroundColor: "#7C3AED", // Purple
  },
  buyButton: {
    backgroundColor: "#FF7043", // Orange
  },
  text: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default TreatmentActionButton;
