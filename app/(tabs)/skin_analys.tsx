import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RequiredLogin from "@/components/required/required_login";
import { useAuthStore } from "@/store/authStore";
import ConsultationHeader from "@/components/header/consultationHeader";
import { useSkinAnalys } from "@/api/skin_analys";

import SkinAnalysSummary from "@/components/skin_analys/SkinAnalysSummary";
import SkinScoreSection from "@/components/skin_analys/SkinScoreSection";
import SkinTypeCard from "@/components/skin_analys/SkinTypeCard";
import SkinIssueList from "@/components/skin_analys/SkinIssueList";
import DataStateView from "@/components/common/DataStateView";
import SkinAnalysActionButton from "@/components/skin_analys/SkinAnalysActionButton";
import { getSkinAnalysisCooldown } from "@/components/utils/skinCooldown";

export default function SkinAnalysScreen() {
  const customerId = useAuthStore((state) => state.customerId);
  const { data, isLoading, isError, refetch } = useSkinAnalys(customerId);

  if (!customerId) {
    return <RequiredLogin />;
  }

  const hasData = !!data;

  const cooldown = getSkinAnalysisCooldown(data?.createdAt);

  return (
    <SafeAreaView style={styles.container}>
      <ConsultationHeader title="Skin Analysis" />

      <DataStateView
        isLoading={isLoading}
        isError={isError}
        data={data as any}
        onRetry={refetch}
        emptyMessage="Belum ada hasil analisis kulit."
        message="Lakukan skin analysis untuk mengetahui kondisi kulit wajahmu dan
            mendapatkan rekomendasi perawatan yang sesuai."
      />

      {data && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SkinAnalysSummary imageUrl={data.imageUrl} />
          <SkinScoreSection
            acne={data.acneScore}
            wrinkle={data.wrinkleScore}
            oil={data.oilScore}
          />
          <SkinTypeCard skinType={data.skinType} severity={data.severity} />
          <SkinIssueList result={data.rawResponse.result} />
        </ScrollView>
      )}

      <SkinAnalysActionButton
        hasData={hasData}
        customerId={customerId}
        canAnalyze={cooldown.canAnalyze}
        remainingDays={cooldown.remainingDays}
        remainingHours={cooldown.remainingHours}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
