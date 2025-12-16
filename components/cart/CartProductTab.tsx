import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import SelectAllButton from "./SelectedAllButton";
import CartItemCard from "./CartProductCard";

import { ProductCartItem } from "@/api/cart/types";
import {
  useDeleteAllCartProduct,
  useDeleteCartProduct,
  useSelectAllCartProduct,
  useSelectCartProduct,
  useUpdateCartProduct,
} from "@/api/cart";
import Toast from "react-native-toast-message";
import CartSummary from "./CartSummary";
import { router } from "expo-router";

interface CartProductTabProps {
  isDark: boolean;
  cart: ProductCartItem[];
}

const CartProductTab: React.FC<CartProductTabProps> = ({
  cart,
}: CartProductTabProps) => {
  const deleteProduct = useDeleteCartProduct();
  const updateProduct = useUpdateCartProduct();
  const selectMutation = useSelectCartProduct();
  const selectAllMutation = useSelectAllCartProduct();
  const deleteAllMutation = useDeleteAllCartProduct();

  const handleToggleSelect = (id: string) => {
    selectMutation.mutate(id);
  };

  const handleUpdateQuantity = (id: string, type: string) => {
    const payload = {
      productId: id,
      type: type,
    };
    updateProduct.mutate(payload);
  };

  const handleRemoveItem = (id: string) => {
    deleteProduct.mutate(id, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil menghapus produk dari kerjanang",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menghapus produk dari kerjanang",
        });
      },
    });
  };

  const handleSelectAll = () => {
    selectAllMutation.mutate();
  };

  const handleDeleteAll = () => {
    deleteAllMutation.mutate();
  };

  const selectedProduct = cart?.filter((item) => item.isSelected);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <SelectAllButton
          cartItems={cart}
          selectedItems={selectedProduct}
          onPress={handleSelectAll}
          onDeleteAll={handleDeleteAll}
        />

        {cart.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            isDark={false}
            onToggleSelect={() => handleToggleSelect(item.id)}
            onUpdateQuantity={(type) =>
              handleUpdateQuantity(item.product.id, type)
            }
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ScrollView>

      <CartSummary
        selectedItems={selectedProduct}
        isDark={false}
        onCheckout={() =>
          router.push({
            pathname: "/checkout/checkoutScreen",
            params: { typeCheckout: "product" },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flex: 1 },
  scrollContentContainer: { paddingBottom: 20 },
});

export default CartProductTab;
