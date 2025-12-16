import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface DataStateViewProps {
  isLoading?: boolean;
  isError?: boolean;
  data?: any[] | null;
  onRetry?: () => void;
  emptyMessage?: string;
}

const DataStateView: React.FC<DataStateViewProps> = ({
  isLoading = false,
  isError = false,
  data,
  onRetry,
  emptyMessage = "Belum ada data.",
}) => {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7B2CBF" />
        <Text style={styles.text}>Memuat data...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { color: "#D14343" }]}>
          Terjadi kesalahan saat memuat data.
        </Text>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Coba Lagi</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>{emptyMessage}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#555",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#7B2CBF",
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default DataStateView;
