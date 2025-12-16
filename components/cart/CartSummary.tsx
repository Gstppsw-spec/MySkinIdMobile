import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartSummaryProps {
  selectedItems: any[];
  isDark: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  selectedItems,
  isDark,
  onCheckout,
}) => {
  console.log(selectedItems);

  const totalPrice = selectedItems.reduce(
    (sum, item) =>
      sum +
      (item.product.price -
        (item.product.price * item.product.discountPercent) / 100) *
        (item.qty || 1),
    0
  );

  const totalItems = selectedItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  const totalDiscount = selectedItems.reduce(
    (sum, item) =>
      sum +
      ((item.product.price * item.product.discountPercent) / 100) *
        (item.qty || 1),
    0
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.infoBar}>
        <View style={styles.leftInfo}>
          <View style={styles.totalItemsContainer}>
            <Ionicons name="cube-outline" size={16} color={"#64748B"} />
            <Text style={[styles.totalItemsText]}>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </Text>
          </View>
          <Text style={[styles.totalPrice]}>
            Rp {totalPrice.toLocaleString("id-ID")}
          </Text>
        </View>

        {/* Right: Checkout Button */}
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            selectedItems.length === 0 && styles.checkoutButtonDisabled,
          ]}
          onPress={onCheckout}
          disabled={selectedItems.length === 0}
          activeOpacity={0.8}
        >
          <View style={styles.checkoutContent}>
            <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </View>
          <View style={styles.itemCount}>
            <Text style={styles.itemCountText}>{selectedItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Additional Info - Only shown when expanded/collapsible */}
      {totalDiscount > 0 && (
        <View style={styles.additionalInfo}>
          <View style={styles.discountRow}>
            <View style={styles.discountLeft}>
              <Ionicons name="pricetag-outline" size={14} color="#10B981" />
              <Text style={[styles.discountLabel]}>Total Diskon</Text>
            </View>
            <Text style={styles.discountValue}>
              -Rp {totalDiscount.toLocaleString("id-ID")}
            </Text>
          </View>

          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <Ionicons name="shield-checkmark" size={12} color={"#64748B"} />
            <Text style={[styles.securityText]}>
              Transaksi Aman & Terenkripsi
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  containerDark: {
    backgroundColor: "#1E1B2E",
    borderTopColor: "#2D2A40",
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftInfo: {
    flex: 1,
  },
  totalItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  totalItemsText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginLeft: 6,
  },
  totalPrice: {
    fontSize: 18,
    color: "#7C3AED",
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  textDark: {
    color: "#FFFFFF",
  },
  checkoutButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
    elevation: 0,
  },
  checkoutContent: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  itemCount: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
  },
  itemCountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  additionalInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  discountLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginLeft: 6,
  },
  discountValue: {
    fontSize: 13,
    color: "#10B981",
    fontWeight: "600",
  },
  securityBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  securityText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
    marginLeft: 4,
  },
  securityTextDark: {
    color: "#94A3B8",
  },
});

export default CartSummary;
