import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

const PlaceList = ({ place }: any) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Discover Premium Clinics</Text>
        <Text style={styles.headerSubtitle}>
          Experience excellence in healthcare
        </Text>
        <View style={styles.headerDivider} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {place?.length > 0 &&
          place.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/location/detail",
                  params: { id: item.id.toString() },
                })
              }
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      "http://192.168.1.109:3000" +
                      item?.imagelocation[0]?.image_url,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay} />

                <View style={styles.premiumBadge}>
                  <Ionicons name="diamond" size={12} color="#FFD700" />
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Ionicons name="location" size={14} color="#E8D5BB" />
                      <Text style={styles.distance}>1.2 km</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Ionicons name="time" size={14} color="#E8D5BB" />
                      <Text style={styles.distance}>Open 24/7</Text>
                    </View>
                  </View>
                </View>

                {/* Rating Badge */}
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default PlaceList;

const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 280;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2C2C2C",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8D6E63",
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 12,
  },
  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#D4B896",
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginRight: 20,

    // Enhanced Shadow
    shadowColor: "#5D4037",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,

    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0EBE6",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 100,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  premiumBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  premiumText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B8860B",
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distance: {
    fontSize: 13,
    color: "#E8D5BB",
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: "#F8F5F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8D5BB",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8D6E63",
    letterSpacing: 0.3,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B7355",
    margin: 20,
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#8B7355",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginRight: 8,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D4B896",
    marginHorizontal: 3,
  },
});
