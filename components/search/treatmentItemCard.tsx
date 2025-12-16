import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../search/styles";

interface TreatmentItem {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: string;
  rating?: number;
  reviews?: number;
}

export default function TreatmentItemCard({ item }: { item: TreatmentItem }) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.cardHeader}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.rating && (
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewsText}>({item.reviews})</Text>
            </View>
          )}
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.featuresContainer}>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color="#7C3AED" />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
