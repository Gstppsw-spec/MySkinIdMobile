import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import HeaderBack from "@/components/header/HeaderBack";
import useStore from "@/store/useStore";
import { useCreateConsultationRoom } from "@/api/consultation/mutation";
import { useAuthStore } from "@/store/authStore";

const { width, height } = Dimensions.get("window");

export default function ConsultationDetail() {
  const { id, name, description, uri } = useLocalSearchParams<{
    id: string;
    name: string;
    description: string;
    uri: string;
  }>();

  const [mainImage, setMainImage] = useState(uri);
  const [previewVisible, setPreviewVisible] = useState(false);
  const setRoomConsultationId = useStore(
    (state) => state.setRoomConsultationId
  );
  const customerId = useAuthStore((state) => state.customerId);
  const mutation = useCreateConsultationRoom();

  const otherImages = [
    uri,
    "https://images.unsplash.com/photo-1588776814546-ec7b1b1e8b8f",
    "https://images.unsplash.com/photo-1606813902914-893a5fbc9b1b",
    "https://images.unsplash.com/photo-1619983081563-cfd9bdb8d8b5",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  ];

  const handleStartChat = () => {
    if (!customerId) {
      router.push("/authentication");
    } else {
      const payload = {
        consultationCategoryId: id,
        customerId: customerId,
      };
      mutation.mutate(payload as any, {
        onSuccess: (data) => {
          // setRoomConsultationId(data.id);
          router.push("/(tabs)/consultation");
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={name || "Detail Kategori"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gambar utama */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPreviewVisible(true)}
        >
          <Image source={{ uri: mainImage }} style={styles.mainImage} />
        </TouchableOpacity>

        {/* List gambar kecil */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailContainer}
        >
          {otherImages.map((img, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMainImage(img)}
              style={[
                styles.thumbnailWrapper,
                mainImage === img && styles.thumbnailActive,
              ]}
            >
              <Image source={{ uri: img }} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Konten deskripsi */}
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tentang Layanan Ini</Text>
            <Text style={styles.sectionText}>
              Layanan {name} dirancang untuk memberikan pengalaman terbaik
              dengan tenaga profesional dan bahan berkualitas tinggi. Kami
              memastikan Anda mendapatkan hasil yang optimal dengan kenyamanan
              maksimal.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Tombol Mulai Konsultasi */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleStartChat}
        >
          <Text style={styles.buttonText}>Mulai Konsultasi</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Preview Gambar */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setPreviewVisible(false)}
          >
            <Image
              source={{ uri: mainImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  mainImage: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  thumbnailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },

  thumbnailWrapper: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },

  thumbnailActive: {
    borderColor: "#2563eb",
  },

  thumbnail: {
    width: width / 4,
    height: width / 5,
    borderRadius: 10,
  },

  content: {
    padding: 20,
    paddingBottom: 100,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  desc: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 12,
  },

  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 22,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  button: {
    backgroundColor: "#24154C",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#24154C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  fullImage: {
    width: width,
    height: height,
  },
});
