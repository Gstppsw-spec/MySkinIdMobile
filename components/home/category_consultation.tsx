import useStore from "@/store/useStore";
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
} from "react-native";

const { width } = Dimensions.get("window");

const CategoryConsultationComponent = ({
  category_consultation
}: any) => {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Konsultasikan keluhan wajahmu pada Ahlinya
        </Text>
        <Text style={styles.subtitle}>
          #GoGlow dengan solusi dari dokter ahli di bidang
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {category_consultation?.length > 0 && (
          <View style={styles.container}>
            {/* Baris Pertama - 4 Kategori Pertama */}
            <View style={styles.row}>
              {category_consultation
                .slice(0, 5)
                .map((item: any, index: number) => (
                  <View style={styles.categoryItem} key={`first-${index}`}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      activeOpacity={0.7}
                      onPress={() => handlePress(item)}
                    >
                      <Image
                        source={{
                          uri: "https://sys.eudoraclinic.com:84/app/uploads/service/1757500935_WhatsApp_Image_2025-09-10_at_17_19_46.jpeg",
                        }}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>

                    {index < 3 && (
                      <View
                        style={[
                          styles.trendingBadge,
                          index === 0 && styles.trendingFirst,
                          index === 1 && styles.trendingSecond,
                          index === 2 && styles.trendingThird,
                        ]}
                      >
                        <Ionicons name="trending-up" size={10} color="#FFF" />
                      </View>
                    )}

                    <Text
                      style={styles.categoryName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
            </View>
            <View style={styles.row}>
              {category_consultation
                .slice(5, 9)
                .map((item: any, index: number) => (
                  <View style={styles.categoryItem} key={`second-${index}`}>
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      activeOpacity={0.7}
                      onPress={() => handlePress(item)}
                    >
                      <Image
                        source={{
                          uri: "https://sys.eudoraclinic.com:84/app/uploads/service/1757500935_WhatsApp_Image_2025-09-10_at_17_19_46.jpeg",
                        }}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>
                    <Text
                      style={styles.categoryName}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}

              <View style={styles.categoryItem}>
                <TouchableOpacity
                  style={styles.moreButton}
                  activeOpacity={0.8}
                  onPress={() => router.push("/consultation")}
                >
                  <Ionicons name="grid-outline" size={28} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.categoryName}>Lainnya</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryConsultationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    // marginBottom: 5,
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#222",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#555",
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 14,
    columnGap: 10,
    justifyContent: "center",
  },
  categoryItem: {
    width: width / 5.5,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around", // 🔹 Distribusi merata
    alignItems: "flex-start", // 🔹 Pastikan alignment di atas
    width: "100%",
    columnGap: 15,
    marginVertical: 10,
  },

  iconWrapper: {
    width: 50, // 🔹 Ukuran tetap
    height: 50, // 🔹 Ukuran tetap
    borderRadius: 25,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 8, // 🔹 Jarak konsisten dengan teks
  },
  iconImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  moreButton: {
    width: 50, // 🔹 Ukuran sama dengan iconWrapper
    height: 50, // 🔹 Ukuran sama dengan iconWrapper
    borderRadius: 25,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 8, // 🔹 Jarak konsisten dengan teks
  },
  categoryName: {
    fontSize: 11,
    textAlign: "center",
    color: "#374151",
    fontWeight: "500",
    lineHeight: 14,
    minHeight: 28, // 🔹 Tinggi minimum untuk dua baris teks
    width: "100%", // 🔹 Lebar penuh container
  },
  trendingBadge: {
    position: "absolute",
    top: -4,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  trendingFirst: {
    backgroundColor: "#F59E0B", // Gold untuk ranking 1
  },
  trendingSecond: {
    backgroundColor: "#6B7280", // Silver untuk ranking 2
  },
  trendingThird: {
    backgroundColor: "#92400E", // Bronze untuk ranking 3
  },
});
