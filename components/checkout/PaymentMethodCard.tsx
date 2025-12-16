import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaymentMethodCardProps {
  label: string;
  description?: string;
  selected: boolean;
  isDark: boolean;
  onPress: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  label,
  description,
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
      <Text style={[styles.label, isDark && styles.textDark]}>{label}</Text>
      {description && (
        <Text style={[styles.description, isDark && styles.textDark]}>
          {description}
        </Text>
      )}
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
  label: { fontSize: 14, fontWeight: "700", marginBottom: 4, color: "#1E293B" },
  description: { fontSize: 13, color: "#475569" },
  textDark: { color: "#FFFFFF" },
});

export default PaymentMethodCard;
