import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { styles } from "../search/styles";

export default function LoadingState() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#7C3AED" />
      <Text style={styles.loadingText}>Mencari treatment terbaik...</Text>
    </View>
  );
}
