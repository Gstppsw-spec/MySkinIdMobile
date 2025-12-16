import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TreatmentDetails {
  description: string;
  compotition?: string[];
  benefit?: string[];
  indicationOfUse?: string[];
  durationOfResults?: string;
  securityAndCertification?: string[];
  contraIndication?: string[];
  postTreatmentCare?: string[];
}

interface Props {
  details: TreatmentDetails;
}

const TreatmentDescription: React.FC<Props> = ({ details }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const fullContent = (
    <View>
      <Text style={styles.text}>{details?.description}</Text>

      {details?.compotition ? (
        <>
          <Text style={styles.title}>Komposisi</Text>
          <Text style={styles.listText}>• {details?.compotition}</Text>
        </>
      ) : null}

      {details?.benefit ? (
        <>
          <Text style={styles.title}>Manfaat & Keunggulan</Text>
          <Text style={styles.listText}>✅ {details.benefit}</Text>
        </>
      ) : null}

      {details.indicationOfUse ? (
        <>
          <Text style={styles.title}>Indikasi Penggunaan</Text>

          <Text style={styles.listText}>✨ {details.indicationOfUse}</Text>
        </>
      ) : null}

      {details.durationOfResults ? (
        <>
          <Text style={styles.title}>Durasi Hasil</Text>
          <Text style={styles.text}>
            Hasil treatment dapat bertahan hingga {details.durationOfResults}
          </Text>
        </>
      ) : null}

      {details.securityAndCertification ? (
        <>
          <Text style={styles.title}>Keamanan & Sertifikasi</Text>

          <Text style={styles.listText}>
            ✅ {details.securityAndCertification}
          </Text>
        </>
      ) : null}

      {details.contraIndication ? (
        <>
          <Text style={styles.title}>Kontra Indikasi</Text>

          <Text style={styles.listText}>⚠️ {details.contraIndication}</Text>
        </>
      ) : null}

      {details.postTreatmentCare ? (
        <>
          <Text style={styles.title}>Perawatan Setelah Treatment</Text>
          <Text style={styles.listText}>📝 {details.postTreatmentCare}</Text>
        </>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deskripsi Treatment</Text>

      <View style={{ overflow: "hidden" }}>
        {expanded ? (
          fullContent
        ) : (
          <View style={{ maxHeight: 120 }}>{fullContent}</View>
        )}
      </View>

      <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
        <Text style={styles.seeMore}>
          {expanded ? "Sembunyikan" : "Lihat selengkapnya"}
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
  listText: {
    color: "#444",
    lineHeight: 20,
    fontSize: 12,
    marginBottom: 4,
    marginLeft: 4,
  },
  seeMore: {
    color: "#7C3AED",
    fontWeight: "600",
    marginTop: 10,
    fontSize: 13,
  },
});

export default TreatmentDescription;
