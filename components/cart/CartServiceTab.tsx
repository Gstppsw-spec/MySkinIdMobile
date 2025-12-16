import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CartSummary from "./CartSummary";
import SelectAllButton from "./SelectedAllButton";
import CartTreatmentCard from "./CartTreatmentCard";
import EmptyState from "./EmptyState";
import { router } from "expo-router";
import { ServiceCartItem } from "@/api/cart/types";
import CartSummaryService from "./CartSummaryService";
import {
  useDeleteAllCartService,
  useDeleteCartService,
  useSelectAllCartService,
  useSelectCartService,
  useUpdateCartService,
} from "@/api/cart";
import Toast from "react-native-toast-message";

interface CartTreatmentTabProps {
  isDark: boolean;
  cart: ServiceCartItem[];
}

interface TreatmentItem {
  id: number;
  name: string;
  price: number;
  priceDiscount: number;
  quantity: number;
  selected: boolean;
  imageOutlet: string;
  outletName: string;
  distance: string;
  duration: string;
}

const CartServiceTab: React.FC<CartTreatmentTabProps> = ({ isDark, cart }) => {
  const [treatmentItems, setTreatmentItems] = useState<TreatmentItem[]>([
    {
      id: 1,
      name: "Facial Brightening Treatment",
      price: 350000,
      priceDiscount: 280000,
      quantity: 1,
      selected: true,
      imageOutlet:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
      outletName: "Oriskin Clinic",
      distance: "2.3 km",
      duration: "45 menit",
    },
    {
      id: 2,
      name: "Acne Control Treatment",
      price: 400000,
      priceDiscount: 340000,
      quantity: 2,
      selected: false,
      imageOutlet:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      outletName: "Glow Aesthetic Center",
      distance: "1.8 km",
      duration: "60 menit",
    },
  ]);

  const deleteService = useDeleteCartService();
  const updateService = useUpdateCartService();
  const selectMutation = useSelectCartService();
  const selectAllMutation = useSelectAllCartService();
  const deleteAllMutation = useDeleteAllCartService();

  const handleToggleSelect = (id: string) => {
    selectMutation.mutate(id);
  };

  const handleUpdateQuantity = (id: string, type: string) => {
    const payload = {
      serviceId: id,
      type: type,
    };
    updateService.mutate(payload);
  };

  const handleRemoveItem = (id: string) => {
    deleteService.mutate(id, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil menghapus service dari kerjanang",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menghapus service dari kerjanang",
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

  const selectedService = cart.filter((item) => item.isSelected);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {treatmentItems?.length > 0 && (
          <SelectAllButton
            cartItems={cart}
            selectedItems={selectedService}
            onPress={handleSelectAll}
            onDeleteAll={handleDeleteAll}
          />
        )}

        {cart.map((item) => (
          <CartTreatmentCard
            key={item.id}
            item={item}
            isDark={isDark}
            onToggleSelect={() => handleToggleSelect(item.id)}
            onUpdateQuantity={(type) =>
              handleUpdateQuantity(item.service.id, type)
            }
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ScrollView>

      <CartSummaryService
        selectedItems={selectedService}
        isDark={isDark}
        onCheckout={() =>
          router.push({
            pathname: "/checkout/checkoutScreen",
            params: { typeCheckout: "service" },
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

export default CartServiceTab;
