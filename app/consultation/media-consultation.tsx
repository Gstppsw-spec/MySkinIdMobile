import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import DataStateView from "@/components/common/DataStateView";
import useStore from "@/store/useStore";
import { useMediaConsultationByRoomId } from "@/api/consultation";
import HeaderBack from "@/components/header/HeaderBack";
import ChatImagePreviewModal from "@/components/common/ChatPreviewImageModal";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 3 - 10;

export default function MediaConsultaion() {
  const router = useRouter();
  const roomConsultationId = useStore(
    (state: { roomConsultationId: string }) => state.roomConsultationId
  );
  const [previewChatImage, setPreviewChatImage] = useState<string | null>(null);
  const handlePreviewChatImage = (uri: string) => {
    setPreviewChatImage(uri);
  };
  const handleCloseChatPreview = () => setPreviewChatImage(null);

  const { data, isError, isLoading, refetch } =
    useMediaConsultationByRoomId(roomConsultationId);

  const hasData = data && data?.length > 0;
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.imageWrapper}
      activeOpacity={0.8}
      onPress={() => handlePreviewChatImage(item.imageUrl)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title="Gallery Konsultasi" />

      <DataStateView
        isLoading={isLoading}
        isError={isError}
        data={data}
        onRetry={refetch}
        emptyMessage="Belum ada media."
      />

      <ChatImagePreviewModal
        visible={!!previewChatImage}
        imageUri={previewChatImage}
        onClose={handleCloseChatPreview}
      />

      {/* === Grid List === */}
      {!isLoading && !isError && hasData && (
        <FlatList
          data={data}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 1,
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  gridContainer: {
    padding: 2,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 2,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#555",
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: "#7B2CBF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
});
