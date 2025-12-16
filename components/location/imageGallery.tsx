import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ImageGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 20 }}>
        <Text style={{ color: "#9CA3AF", fontSize: 14 }}>Tidak ada gambar</Text>
      </View>
    );
  }

  const total = images.length;

  const preview = total <= 4 ? images : images.slice(0, 4);
  const remaining = total > 4 ? total - 4 : 0;
  const { width } = Dimensions.get("window");
  const imageWidth = (width - 60) / 4;
  const imageGap = 8;


  return (
    <View style={styles.container}>
      <View style={styles.galleryRow}>
        {preview.map((img: any, index) => (
          <View
            key={index}
            style={[
              styles.imageContainer,
              { marginRight: index < preview.length - 1 ? imageGap : 0 },
            ]}
          >
            {total > 4 && index === 3 ? (
              <TouchableOpacity style={styles.touchableArea}>
                <View
                  style={[
                    styles.imageWrapper,
                    { width: imageWidth, height: imageWidth },
                  ]}
                >
                  <Image
                    source={{ uri: img.imageUrl }}
                    style={[
                      styles.image,
                      { width: imageWidth, height: imageWidth },
                    ]}
                  />
                  <View style={styles.overlay} />
                  <View style={styles.remainingCount}>
                    <Text style={styles.remainingText}>+{remaining}</Text>
                    <Text style={styles.remainingSubtext}>Lihat Semua</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.touchableArea}>
                <Image
                  source={{ uri: img.imageUrl }}
                  style={[
                    styles.image,
                    styles.regularImage,
                    { width: imageWidth, height: imageWidth },
                  ]}
                />
                {index === 0 && (
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredText}>Utama</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {total > 1 && (
        <View style={styles.indicatorContainer}>
          {preview.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                index === 0 ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  galleryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
  },
  touchableArea: {
    borderRadius: 12,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#F3F4F6",
  },
  image: {
    borderRadius: 12,
  },
  regularImage: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  remainingCount: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  remainingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  remainingSubtext: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 10,
    fontWeight: "500",
  },
  featuredBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#7C3AED",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featuredText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeIndicator: {
    backgroundColor: "#7C3AED",
    width: 20,
  },
  inactiveIndicator: {
    backgroundColor: "#E5E7EB",
  },
});
