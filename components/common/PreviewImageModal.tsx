import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface PreviewImageModalProps {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
  onSend: () => void;
  title?: string;
  cancelText?: string;
  sendText?: string;
}

const PreviewImageModal: React.FC<PreviewImageModalProps> = ({
  visible,
  imageUri,
  onClose,
  onSend,
  title = "Pratinjau Gambar",
  cancelText = "Batal",
  sendText = "Kirim",
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header dengan tombol X */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{title}</Text>

            {/* Spacer untuk balance layout */}
            <View style={styles.headerSpacer} />
          </View>

          {/* Image Content */}
          <View style={styles.imageContainer}>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Action Buttons - WAJIB ada kedua tombol */}
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={onClose}
            >
              <Text style={[styles.actionText, styles.cancelText]}>
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.sendBtn]}
              onPress={onSend}
            >
              <Ionicons
                name="send"
                size={18}
                color="#fff"
                style={styles.sendIcon}
              />
              <Text style={[styles.actionText, styles.sendText]}>
                {sendText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  headerSpacer: {
    width: 24,
  },
  imageContainer: {
    height: 400,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  cancelBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  sendBtn: {
    backgroundColor: "#1A122D",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    color: "#fff",
  },
  sendText: {
    color: "#fff",
  },
  sendIcon: {
    marginRight: 4,
  },
});

export default PreviewImageModal;
