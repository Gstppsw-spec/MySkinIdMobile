// import AddAddressForm from "@/components/address/AddressForm";
import AddAddressForm from "@/components/address/AddressForm";
import HeaderBack from "@/components/header/HeaderBack";
import React from "react";
import { SafeAreaView } from "react-native";

export default function AddAddressScreen() {
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <HeaderBack title="Tambah Alamat" />
      <AddAddressForm />
    </SafeAreaView>
  );
}
