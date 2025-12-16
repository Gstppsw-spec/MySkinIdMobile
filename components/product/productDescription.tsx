import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  details: any;
}

const ProductDescription: React.FC<Props> = ({ details }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const fullContent = (
    <View>
      <Text style={styles.text}>{details.description}</Text>

      <Text style={styles.title}>Indikasi Umum / Fungsi</Text>
      <Text style={styles.text}>{details.indikasi}</Text>

      <Text style={styles.title}>Komposisi</Text>
      <Text style={styles.text}>{details.komposisi}</Text>

      <Text style={styles.title}>Dosis</Text>
      <Text style={styles.text}>{details.dosis}</Text>

      <Text style={styles.title}>Aturan Pakai</Text>
      <Text style={styles.text}>{details.aturanPakai}</Text>

      <Text style={styles.title}>Kontra Indikasi</Text>
      <Text style={styles.text}>{details.kontraIndikasi}</Text>

      <Text style={styles.title}>Golongan</Text>
      <Text style={styles.text}>{details.golongan}</Text>

      <Text style={styles.title}>Perhatian</Text>
      <Text style={styles.text}>{details.perhatian}</Text>

      <Text style={styles.title}>Kemasan</Text>
      <Text style={styles.text}>{details.kemasan}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deskripsi Produk</Text>

      <View style={{ overflow: "hidden" }}>
        {expanded ? (
          fullContent
        ) : (
          <View style={{ maxHeight: 120 }}>{fullContent}</View>
        )}
      </View>

      <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
        <Text style={styles.showMore}>
          {expanded ? "Lihat lebih sedikit" : "Lihat selengkapnya"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  text: {
    color: "#444",
    lineHeight: 20,
    fontSize: 12,
    marginBottom: 4,
  },
  showMore: {
    color: "#7C3AED",
    fontWeight: "600",
    marginTop: 10,
    fontSize: 13,
  },
});

export default ProductDescription;
