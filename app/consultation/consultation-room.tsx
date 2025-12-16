import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ConsultationRoomHeader from "@/components/header/ConsultationRoomHeader";
import useStore from "@/store/useStore";
import {
  useConsultationByRoomId,
  useConsultationMessage,
} from "@/api/consultation";
import { formatDateToIndo } from "@/components/utils/dateFormatter";
import DataStateView from "@/components/common/DataStateView";
import MediaPickerBottomSheet, {
  MediaPickerBottomSheetRef,
} from "@/components/common/MediaPickerBottomSheet";
import ChatImagePreviewModal from "@/components/common/ChatPreviewImageModal";
import {
  useCreateConsultationImageMessage,
  useCreateConsultationMessage,
} from "@/api/consultation/mutation";

export default function ConsultationRoom() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [previewChatImage, setPreviewChatImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const mediaPickerRef = useRef<MediaPickerBottomSheetRef>(null);
  const flatListRef = useRef<FlatList>(null);

  const roomConsultationId = useStore(
    (state: { roomConsultationId: string }) => state.roomConsultationId
  );

  const { data, isError, isLoading, refetch } =
    useConsultationByRoomId(roomConsultationId);

  const { data: messages } = useConsultationMessage(roomConsultationId);

  const sendImageMutation = useCreateConsultationImageMessage();

  const handleImagePicked = (uris: string[]) => {
    setSelectedImage((prev) => [...prev, ...uris]);
  };

  const handleRemoveImage = (uri: string) => {
    setSelectedImage((prev) => prev.filter((img) => img !== uri));
  };

  const handlePreviewChatImage = (uri: string) => {
    setPreviewChatImage(uri);
  };

  const handleCloseChatPreview = () => setPreviewChatImage(null);

  const handleSend = async () => {
    const formData = new FormData();
    formData.append("roomId", roomConsultationId);
    formData.append("messageType", "text");
    formData.append("senderRole", "customer");
    formData.append("message", message);

    selectedImage.forEach((uri, i) => {
      formData.append("images", {
        uri,
        type: "image/jpeg",
        name: `chat_${Date.now()}_${i}.jpg`,
      } as any);
    });

    try {
      await sendImageMutation.mutateAsync(formData, {

      });
      setSelectedImage([]);
      setMessage("");
    } catch (err) {
      Alert.alert("Gagal", "Tidak bisa mengirim gambar");
    }
  };

 
  return (
    <SafeAreaView style={styles.container}>
      {data && (
        <ConsultationRoomHeader
          title={data?.consultationCategory?.name || "Konsultasi"}
          activeUntil={formatDateToIndo(data?.expiredAt)}
          onBack={() => router.back()}
          onMediaPress={() => router.push("/consultation/media-consultation")}
          onRecipePress={() => console.log("Resep pressed")}
        />
      )}

      <DataStateView
        isLoading={isLoading}
        isError={isError}
        data={data ? [data] : []}
        onRetry={refetch}
        emptyMessage="Belum ada konsultasi."
      />

      <ChatImagePreviewModal
        visible={!!previewChatImage}
        imageUri={previewChatImage}
        onClose={handleCloseChatPreview}
      />

      {!isLoading && !isError && data && messages && (
        <>
          <FlatList
            data={messages}
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isCustomer = item?.senderRole === "customer";
              const hasImages = item?.consultationImage?.length > 0;
              return (
                <View
                  style={[
                    styles.chatBubble,
                    isCustomer ? styles.chatUser : styles.chatDoctor,
                  ]}
                >
                  {/* === Jika ada gambar === */}
                  {hasImages && (
                    <View
                      style={{
                        flexDirection:
                          item?.consultationImage?.length === 1
                            ? "column"
                            : "row",
                        flexWrap: "wrap",
                        gap: 6,
                      }}
                    >
                      {item?.consultationImage?.map(
                        (imgUri: any, idx: number) => (
                          <TouchableOpacity
                            key={idx}
                            onPress={() =>
                              handlePreviewChatImage(
                                imgUri.imageUrl
                              )
                            }
                            activeOpacity={0.8}
                          >
                            <Image
                              source={{ uri: imgUri.imageUrl }}
                              style={[
                                styles.chatImage,
                                item?.consultationImage?.length > 1 &&
                                  styles.multiImage,
                              ]}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  )}

                  {/* === Jika ada pesan teks === */}
                  {item.message ? (
                    <Text
                      style={[
                        styles.chatText,
                        { color: isCustomer ? "#fff" : "#111827" },
                      ]}
                    >
                      {item.message}
                    </Text>
                  ) : null}
                </View>
              );
            }}
            contentContainerStyle={{ padding: 16 }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={90}
          >
            {selectedImage.length > 0 && (
              <ScrollView
                horizontal
                style={styles.previewContainer}
                showsHorizontalScrollIndicator={false}
              >
                {selectedImage.map((uri) => (
                  <View key={uri} style={styles.previewItem}>
                    <TouchableOpacity
                      onPress={() => handlePreviewChatImage(uri)}
                      activeOpacity={0.9}
                    >
                      <Image source={{ uri }} style={styles.previewImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRemoveImage(uri)}
                      style={styles.removeBtn}
                    >
                      <Ionicons name="close-circle" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
            <View style={styles.inputBar}>
              <TouchableOpacity
                style={styles.mediaBtn}
                onPress={() => mediaPickerRef.current?.present()}
              >
                <Ionicons name="camera-outline" size={24} color="#4b5563" />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Tulis pesan..."
                value={message}
                onChangeText={setMessage}
                multiline
              />

              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  !message.trim() &&
                    selectedImage.length == 0 &&
                    styles.sendBtnDisabled,
                ]}
                onPress={handleSend}
                disabled={!message.trim() && selectedImage.length == 0}
              >
                <Ionicons
                  name="send"
                  size={22}
                  color={
                    message.trim() || selectedImage.length > 0
                      ? "#fff"
                      : "#9ca3af"
                  }
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <MediaPickerBottomSheet
            ref={mediaPickerRef}
            onPickImage={handleImagePicked}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  chatUser: {
    alignSelf: "flex-end",
    backgroundColor: "#1A122D",
    borderBottomRightRadius: 0,
  },
  chatDoctor: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
    borderBottomLeftRadius: 0,
  },
  chatImage: { width: 200, height: 150, borderRadius: 8 },
  previewContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  previewItem: { marginRight: 10, position: "relative" },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  sendImagesBtn: {
    backgroundColor: "#1A122D",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 50,
    alignSelf: "center",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  mediaBtn: { marginRight: 8, padding: 8 },
  input: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    color: "#111827",
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: "#1A122D",
    padding: 10,
    borderRadius: 50,
    marginLeft: 8,
  },
  sendBtnDisabled: { backgroundColor: "#f3f4f6" },

  chatText: {
    fontSize: 15,
    marginTop: 5,
  },

  multiImage: {
    width: 100,
    height: 100,
  },
});
