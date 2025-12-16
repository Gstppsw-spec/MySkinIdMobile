import { StyleSheet, SafeAreaView, View } from "react-native";
import HeaderBack from "@/components/header/HeaderBack";
import CartProductTab from "@/components/cart/CartProductTab";
import CheckOutProduct from "@/components/checkout/CheckOut";
import { useLocalSearchParams } from "expo-router";
import CheckOut from "@/components/checkout/CheckOut";


export default function CheckOutScreen() {
  const params = useLocalSearchParams();
  const typeCheckOut = params.typeCheckout;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#F8FAFC" }]}>
      <HeaderBack title="Detail Pembayaran" />

      <View style={styles.tabContentWrapper}>
        <CheckOut isDark={false} typeCheckOut={typeCheckOut}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContentWrapper: { flex: 1, paddingTop: 8 },
});
