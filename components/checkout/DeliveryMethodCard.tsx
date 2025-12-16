import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface DeliveryMethodCardProps {
  logo: string; // URL logo
  name: string;
  fee: number; // ongkir
  estimate: string; // estimasi waktu
  selected: boolean;
  isDark: boolean;
  onPress: () => void;
}

const DeliveryMethodCard: React.FC<DeliveryMethodCardProps> = ({
  logo,
  name,
  fee,
  estimate,
  selected,
  isDark,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.cardSelected,
        isDark && styles.cardDark,
      ]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <View style={styles.info}>
          <Text style={[styles.name, isDark && styles.textDark]}>{name}</Text>
          <Text style={[styles.estimate, isDark && styles.textDark]}>
            Estimasi: {estimate}
          </Text>
        </View>
        <View style={styles.feeContainer}>
          <Text style={[styles.fee, isDark && styles.textDark]}>
            Rp {fee.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
    backgroundColor: "#FFF",
  },
  cardSelected: {
    borderColor: "#7C3AED",
    backgroundColor: "#F5F3FF",
  },
  cardDark: {
    borderColor: "#4C1D95",
    backgroundColor: "#2A1A5E",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "700", marginBottom: 2, color: "#1E293B" },
  estimate: { fontSize: 12, color: "#64748B" },
  feeContainer: {},
  fee: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  textDark: { color: "#FFFFFF" },
});

export default DeliveryMethodCard;
