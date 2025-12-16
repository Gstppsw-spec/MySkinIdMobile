import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import CartSummary from "../cart/CartSummary";
import CheckOutProductCard from "./CheckOutProductCard";
import AddressCard from "./AddressCard";
import PaymentMethodCard from "./PaymentMethodCard";
import DeliveryMethodCard from "./DeliveryMethodCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import CardSummaryCheckOut from "./CardSummaryCheckOut";
import CheckOutServiceCard from "./CheckOutServiceCard";

interface CartProductTabProps {
  isDark: boolean;
  typeCheckOut: any;
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  priceDiscount: number;
  quantity: number;
  selected: boolean;
  image: string;
  rating: number;
  ratingCount: number;
  sold: number;
}

interface Address {
  id: number;
  label: string;
  fullAddress: string;
}

const CheckOut: React.FC<CartProductTabProps> = ({ isDark, typeCheckOut }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Brightening Facial Serum",
      price: 200000,
      priceDiscount: 150000,
      quantity: 2,
      selected: true,
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
      rating: 5,
      ratingCount: 12,
      sold: 30,
    },
    {
      id: 2,
      name: "Acne Control Night Cream",
      price: 180000,
      priceDiscount: 153000,
      quantity: 1,
      selected: false,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      rating: 4,
      ratingCount: 8,
      sold: 20,
    },
  ]);

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

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Rumah", fullAddress: "Jl. Merpati No.12, Jakarta" },
    { id: 2, label: "Kantor", fullAddress: "Jl. Sudirman No.45, Jakarta" },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<number>(1);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      label: "Transfer Bank",
      description: "BCA, Mandiri, BRI",
      selected: true,
    },
    { id: 2, label: "OVO", description: "E-wallet OVO", selected: false },
    { id: 3, label: "GoPay", description: "E-wallet GoPay", selected: false },
  ]);

  const [deliveryMethods, setDeliveryMethods] = useState([
    {
      id: 1,
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/JNE_Logo.svg",
      name: "JNE Express",
      fee: 15000,
      estimate: "2-3 hari",
    },
    {
      id: 2,
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/SiCepat_Logo.svg",
      name: "SiCepat",
      fee: 12000,
      estimate: "1-2 hari",
    },
  ]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {typeCheckOut == "product" && (
          <>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
              Pilih Alamat
            </Text>
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                label={addr.label}
                fullAddress={addr.fullAddress}
                selected={selectedAddressId === addr.id}
                isDark={isDark}
                onPress={() => setSelectedAddressId(addr.id)}
              />
            ))}
          </>
        )}

        {typeCheckOut == "product" && (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CheckOutProductCard item={item} />}
              ListHeaderComponent={
                <Text style={[styles.header, isDark && styles.textDark]}>
                  Detail Produk
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 20 }}
              scrollEnabled={false}
            />
          </>
        )}

        {typeCheckOut == "service" && (
          <>
            <FlatList
              data={treatmentItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CheckOutServiceCard item={item} />}
              ListHeaderComponent={
                <Text style={[styles.header, isDark && styles.textDark]}>
                  Detail Service
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 20 }}
              scrollEnabled={false}
            />
          </>
        )}

        {typeCheckOut == "product" && (
          <>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
              Pilih Pengiriman
            </Text>
            <TouchableOpacity
              style={[styles.selectCard, isDark && styles.selectCardDark]}
              onPress={() =>
                router.push({
                  pathname: "/deliveryMethod/method",
                  params: { initialSelectedId: selectedDeliveryId },
                })
              }
            >
              <Text style={[styles.selectCardLabel, isDark && styles.textDark]}>
                {selectedDeliveryId
                  ? deliveryMethods.find((d) => d.id === selectedDeliveryId)
                      ?.name
                  : "Pilih Metode Pengiriman"}
              </Text>
              <Text
                style={[styles.selectCardDetail, isDark && styles.textDark]}
              >
                {selectedDeliveryId
                  ? `Ongkir: Rp ${(
                      deliveryMethods.find((d) => d.id === selectedDeliveryId)
                        ?.fee || 0
                    ).toLocaleString("id-ID")} | Estimasi: ${
                      deliveryMethods.find((d) => d.id === selectedDeliveryId)
                        ?.estimate
                    }`
                  : "Belum dipilih"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
          Metode Pembayaran
        </Text>
        <TouchableOpacity
          style={[styles.selectCard, isDark && styles.selectCardDark]}
          onPress={() =>
            router.push({
              pathname: "/paymentMethod/method",
              params: { initialSelectedId: selectedPaymentId },
            })
          }
        >
          <Text style={[styles.selectCardLabel, isDark && styles.textDark]}>
            {selectedPaymentId
              ? paymentMethods.find((p) => p.id === selectedPaymentId)?.label
              : "Pilih Metode Pembayaran"}
          </Text>
          <Text style={[styles.selectCardDetail, isDark && styles.textDark]}>
            {selectedPaymentId
              ? paymentMethods.find((p) => p.id === selectedPaymentId)
                  ?.description
              : "Belum dipilih"}
          </Text>
        </TouchableOpacity>

        <PaymentSummaryCard
          subtotal={cartItems.reduce(
            (sum, item) => sum + item.priceDiscount * item.quantity,
            0
          )}
          shippingFee={
            deliveryMethods.find((m) => m.id === selectedDeliveryId)?.fee || 0
          }
          discount={0}
          total={
            cartItems.reduce(
              (sum, item) => sum + item.priceDiscount * item.quantity,
              0
            ) +
            (deliveryMethods.find((m) => m.id === selectedDeliveryId)?.fee || 0)
          }
          isDark={isDark}
          typeCheckOut={typeCheckOut}
        />
      </ScrollView>

      <CardSummaryCheckOut
        selectedItems={typeCheckOut == "product" ? cartItems : treatmentItems}
        isDark={isDark}
        shippingFee={
          deliveryMethods.find((m) => m.id === selectedDeliveryId)?.fee || 0
        }
        selectedDelivery={selectedDeliveryId}
        selectedPaymentMethod={selectedPaymentId}
        onCheckout={() => console.log("beli")}
        typeCheckOut={typeCheckOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flex: 1 },
  scrollContentContainer: { paddingBottom: 20, paddingHorizontal: 16 },
  header: {
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 12,
    color: "#1E293B",
  },
  textDark: { color: "#FFFFFF" },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 8 },
  selectCard: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectCardDark: {
    backgroundColor: "#2A1A5E",
    borderColor: "#4C1D95",
  },
  selectCardLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  selectCardDetail: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
});

export default CheckOut;
