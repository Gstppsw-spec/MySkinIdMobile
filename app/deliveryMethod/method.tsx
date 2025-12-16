import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import DeliveryMethodCard from "@/components/checkout/DeliveryMethodCard";
import HeaderBack from "@/components/header/HeaderBack";

interface DeliveryMethod {
  id: number;
  logo: string;
  name: string;
  fee: number;
  estimate: string;
}

interface Props {
  isDark: boolean;
  initialSelectedId?: number;
  onSelect: (id: number) => void;
}

const DeliveryMethodScreen: React.FC<Props> = ({
  isDark,
  initialSelectedId,
  onSelect,
}) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    initialSelectedId || null
  );

  const deliveryMethods: DeliveryMethod[] = [
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
  ];

  const handleSelect = (id: number) => {
    setSelectedDeliveryId(id);
    onSelect(id);
    router.back(); // kembali ke halaman checkout setelah memilih
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <HeaderBack title="Pilih Pengiriman" />

      <FlatList
        data={deliveryMethods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DeliveryMethodCard
            logo={item.logo}
            name={item.name}
            fee={item.fee}
            estimate={item.estimate}
            selected={selectedDeliveryId === item.id}
            isDark={isDark}
            onPress={() => handleSelect(item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  containerDark: {
    backgroundColor: "#1E1B2E",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginVertical: 8,
  },
  textDark: {
    color: "#FFFFFF",
  },
});

export default DeliveryMethodScreen;
