import AddressList from "@/components/address/AddressList";
import HeaderBack from "@/components/header/HeaderBack";
import React from "react";
import { SafeAreaView } from "react-native";

const sampleAddresses = [
  {
    id: "1",
    name: "Gunawan Sitepu",
    phone: "08123456789",
    address: "Jl. Melati No. 12",
    note: "Rumah utama",
  },
  {
    id: "2",
    name: "Jane Doe",
    phone: "08198765432",
    address: "Jl. Kenanga No. 5",
    note: "Apartemen",
  },
];

export default function AddressListScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <HeaderBack title="Alamat" />
      <AddressList addresses={sampleAddresses} />
    </SafeAreaView>
  );
}
