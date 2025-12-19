import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import FaceGuideOverlay from "./FaceGuideOverlay";
import { useCreateSkinAnalys } from "@/api/skin_analys";
import Toast from "react-native-toast-message";
import { Animated } from "react-native";
import { useRef, useEffect } from "react";
import LoadingOverlay from "./LoadingOverlay";

export default function SkinAnalysImagePicker({
  visible,
  onClose,
  customerId,
}: {
  visible: boolean;
  onClose: () => void;
  customerId: string;
}) {
  const [image, setImage] = useState<string | null>(null);
  const skinAnaysMutation = useCreateSkinAnalys();
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (skinAnaysMutation.isPending) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 0.85,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulse.setValue(1);
    }
  }, [skinAnaysMutation.isPending]);

  const pickFromGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };

  const resetImage = () => {
    setImage(null);
  };

  const handleSkinAnalys = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("customerId", customerId);
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: `skin_${Date.now()}.jpg`,
    } as any);

    try {
      await skinAnaysMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Skin Analysis Berhasil",
            text2: "Hasil skin analysis telah diperbarui.",
          });
          onClose();
        },
        onError: (error: any) => {
          Toast.show({
            type: "error",
            text1: "Skin Analysis Gagal",
            text2:
              error?.response?.data?.message ||
              "Terjadi kesalahan saat melakukan skin analysis, coba lagi nanti.",
          });
          onClose();
        },
      });
      setImage(null);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Skin Analysis Gagal",
        text2:
          error?.response?.data?.message ||
          "Terjadi kesalahan saat melakukan skin analysis, coba lagi nanti.",
      });
      onClose();
    }
  };

  const DotLoader = () => {
    const dotAnim = useRef(new Animated.Value(0)).current;
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false, // karena kita update state
          }),
          Animated.timing(dotAnim, {
            toValue: 2,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(dotAnim, {
            toValue: 3,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      );

      const listenerId = dotAnim.addListener(({ value }) => {
        setDotCount(Math.max(1, Math.round(value)));
      });

      animation.start();

      return () => {
        dotAnim.removeListener(listenerId);
        animation.stop();
      };
    }, []);

    return (
      <Text style={{ color: "#FFF", fontWeight: "700" }}>
        Mengirim{".".repeat(dotCount)}
      </Text>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Skin Analysis</Text>

          {!image ? (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.option} onPress={pickFromCamera}>
                <Ionicons name="camera-outline" size={28} />
                <Text>Kamera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} onPress={pickFromGallery}>
                <Ionicons name="image-outline" size={28} />
                <Text>Galeri</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <>
                <Animated.View style={[styles.previewWrapper, { transform: [{ scale: pulse }] }]}>
                  <Image source={{ uri: image }} style={styles.preview} />
                  <FaceGuideOverlay />
                </Animated.View>
                {skinAnaysMutation.isPending && (
                  <View style={styles.imageOverlay} />
                )}

                <View style={styles.previewActions}>
                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={resetImage}
                    disabled={skinAnaysMutation.isPending}
                  >
                    <Ionicons
                      name="refresh-outline"
                      size={18}
                      color="#6C1FC7"
                    />
                    <Text style={styles.changeText}>Ganti Gambar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.submit,
                      skinAnaysMutation.isPending && { opacity: 0.85 },
                    ]}
                    disabled={skinAnaysMutation.isPending}
                    onPress={handleSkinAnalys}
                  >
                    {skinAnaysMutation.isPending ? (
                      <DotLoader />
                    ) : (
                      <Text style={styles.submitText}>Kirim Analisis</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            </>
          )}

          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Text style={{ color: "#64748B" }}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingOverlay visible={skinAnaysMutation.isPending} />
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 28,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  handle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },

  option: {
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8FAFC",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 16,
    width: 120,
  },

  previewWrapper: {
    width: "100%",
    height: 320,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#000",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  previewActions: {
    flexDirection: "row",
    gap: 12,
  },

  changeButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#6C1FC7",
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  changeText: {
    color: "#6C1FC7",
    fontSize: 15,
    fontWeight: "600",
  },

  submit: {
    flex: 1,
    backgroundColor: "#6C1FC7",
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6C1FC7",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },

  submitText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  close: {
    alignItems: "center",
    marginTop: 18,
  },
});
