import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

interface Props {
  item: any;
  isfull: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 300;

const DEFAULT_IMAGES = {
  clinic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_SrGquht8g3cuWR8xSO4G2_X599zmrtR8RQ&s",
  hospital:
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop",
  dental:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=300&fit=crop",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
  beauty:
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=300&fit=crop",
};

const LocationCard: React.FC<Props> = ({ item, isfull = false }) => {
  const handlePress = () =>
    router.push({
      pathname: "/location/detail",
      params: { id: item.id.toString() },
    });

  const calculateDistance = () => {
    const distances = [0.8, 1.2, 1.5, 2.0, 2.5, 3.0];
    return distances[Math.floor(Math.random() * distances.length)];
  };

  const distance = calculateDistance();

  const imageCard = item?.images[0]?.imageUrl || DEFAULT_IMAGES.clinic;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={handlePress}
      style={[styles.card, isfull ? { width: "100%" } : { width: CARD_WIDTH }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageCard }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "rgba(0,0,0,0.1)",
            "rgba(0,0,0,0.8)",
          ]}
          locations={[0, 0.4, 0.7, 1]}
          style={styles.gradient}
        />

        <View style={styles.premiumBadge}>
          <View style={styles.premiumGlow} />
          <Ionicons name="diamond" size={12} color="#FFD700" />
          <Text style={styles.premiumText}>PREMIUM</Text>
        </View>

        {/* Rating Badge dengan micro-interaction */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFFFFF" />
          <Text style={styles.ratingValue}>4.9</Text>
        </View>

        {/* Quick Action FAB */}
        {/* <TouchableOpacity style={styles.fabButton}>
          <Ionicons name="heart-outline" size={16} color="#7C3AED" />
        </TouchableOpacity> */}

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            </View>
          </View>
          <View style={styles.locationRow}>
            <View style={styles.locationItem}>
              <Ionicons name="location" size={12} color="#94A3B8" />
              <Text style={styles.distance}>{distance} km</Text>
            </View>

            <View style={styles.dotSeparator} />

            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, styles.statusOpen]} />
              <Text style={styles.statusText}>Buka 24/7</Text>
            </View>
          </View>
          <View style={styles.actionRow}>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaText}>Lihat</Text>
              <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#FFFFFF",

    shadowColor: "#7C3AED",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,

    borderWidth: 1,
    borderColor: "#F1F5F9",
    transform: [{ scale: 1 }],
    marginBottom: 10,
  },

  imageContainer: {
    flex: 1,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  premiumBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  premiumGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFD700",
    borderRadius: 14,
    opacity: 0.1,
  },

  premiumText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B8860B",
    marginLeft: 4,
    letterSpacing: 0.5,
  },

  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  ratingValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  fabButton: {
    position: "absolute",
    top: 50,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20,
    flex: 1,
    marginRight: 8,
  },

  verifiedBadge: {
    marginTop: 2,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },

  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  distance: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },

  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#CBD5E1",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusOpen: {
    backgroundColor: "#10B981",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#10B981",
  },

  featuresPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  featureText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#475569",
  },

  featureDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 6,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceTag: {
    flex: 1,
  },

  priceLabel: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 2,
  },

  priceValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#7C3AED",
  },

  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7C3AED",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  ctaText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
