import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import HeaderBack from "@/components/header/HeaderBack";
import { useConsultationCategory } from "@/api/consultation";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 3;
const CARD_HEIGHT = 140; // Fixed height untuk semua card

export default function CategoryListPage() {
  const router = useRouter();
  const { data: category_consultation, isLoading } = useConsultationCategory();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  const handlePress = (item: any) => {
    router.push({
      pathname: "/consultation/[id]",
      params: {
        id: item.id,
        name: item.name,
        description: item.description,
        uri: "https://sys.eudoraclinic.com:84/app/uploads/service/1757500935_WhatsApp_Image_2025-09-10_at_17_19_46.jpeg",
      },
    });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => handlePress(item)}
      >
        <LinearGradient
          colors={["#F8FAFF", "#FFFFFF"]}
          style={styles.gradientBackground}
        >
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: "https://sys.eudoraclinic.com:84/app/uploads/service/1757500935_WhatsApp_Image_2025-09-10_at_17_19_46.jpeg",
                }}
                style={styles.image}
              />
              <View style={styles.imageOverlay} />
            </View>

            {/* Badge untuk item trending */}
            {index < 3 && (
              <View
                style={[
                  styles.trendingBadge,
                  index === 0 && styles.trendingFirst,
                  index === 1 && styles.trendingSecond,
                  index === 2 && styles.trendingThird,
                ]}
              >
                <Ionicons name="trending-up" size={12} color="#FFF" />
              </View>
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFF" />
        <View style={styles.loadingContent}>
          <View style={styles.loadingAnimation}>
            <ActivityIndicator size="large" color="#6366F1" />
            <View style={styles.loadingPulse} />
          </View>
          <Text style={styles.loadingText}>Memuat Kategori Konsultasi</Text>
          <Text style={styles.loadingSubtext}>Mohon tunggu sebentar...</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFF" />

      <HeaderBack title="Kategori Konsultasi" />

      <View style={styles.header}>
        <LinearGradient
          colors={["#6366F1", "#8B5CF6"]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <Ionicons name="grid" size={24} color="#FFF" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Pilih Kategori</Text>
              <Text style={styles.headerSubtitle}>
                {category_consultation?.length || 0} kategori tersedia
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <FlatList
        data={category_consultation}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  header: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  headerGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
  },
  loadingContent: {
    alignItems: "center",
  },
  loadingAnimation: {
    position: "relative",
    marginBottom: 20,
  },
  loadingPulse: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: "#6B7280",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT, // Fixed height
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    height: "100%", // Pastikan card memenuhi height wrapper
  },
  gradientBackground: {
    // flex: 1,
    paddingVertical: 16,
    // paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between", // Distribusi merata
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 28,
  },
  trendingBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  trendingFirst: {
    backgroundColor: "#F59E0B",
  },
  trendingSecond: {
    backgroundColor: "#6B7280",
  },
  trendingThird: {
    backgroundColor: "#92400E",
  },
  textContainer: {
    width: "100%",
    minHeight: 36, // Fixed height untuk text container
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 16,
    flexWrap: "wrap",
    // Fixed width untuk text
    width: CARD_WIDTH - 24, // Account for padding
  },
  
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  
  
  
});
