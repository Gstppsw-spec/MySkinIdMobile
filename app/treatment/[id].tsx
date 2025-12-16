import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import TreatmentDetailHeader from "@/components/treatment/header";
import TreatmentInformation from "@/components/treatment/treatmentInformation";
import TreatmentDescription from "@/components/treatment/treatmentDescription";
import TreatmentActionButton from "@/components/treatment/treatmentActiion";
import { Ionicons } from "@expo/vector-icons";
import HotDeals from "@/components/hotdeals/hotDeals";
import { useServiceById, useServices } from "@/api/service";
import TreatmentDetailSkeleton from "@/components/treatment/treatmentDetailSkeleton";
import { PayloadFavorite, useAddFavorite } from "@/api/favorites";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useAddCartService } from "@/api/cart";

const TreatmentDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch, isRefetching } = useServiceById(
    id as string
  );

  const queryClient = useQueryClient();

  const favoriteMutation = useAddFavorite();
  const customerId = useAuthStore((state) => state.customerId);
  const cartProductMutation = useAddCartService();

  const {
    data: services,
    isLoading: isLoadingServices,
    refetch: refetchServices,
    isRefetching: isRefetchingServices,
    isError: isErrorServices,
  } = useServices();

  if (isError || isLoading || isLoadingServices || isErrorServices) {
    return <TreatmentDetailSkeleton />;
  }

  const handleFavorite = () => {
    const payload: PayloadFavorite = {
      customerId: customerId as string,
      refferenceId: id as string,
      favoriteType: "service",
    };

    favoriteMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: data?.message,
        });
        queryClient.invalidateQueries({ queryKey: ["service", id] });
      },
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Outlet gagal ditambahkan ke favorite",
        });
      },
    });
  };

  const handleAddCartProduct = () => {
    const payload = {
      serviceId: id as string,
    };

    cartProductMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil menambahkan service ke cart",
        });
      },
      onError: (err) => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menambahkan service ke cart",
        });
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <TreatmentDetailHeader
        title={data?.name}
        handleFavorite={handleFavorite}
        isFavorite={data?.isFavorite}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ padding: 16 }}>
          <TreatmentInformation items={data} />
          <TreatmentDescription details={data as any} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={() =>
              router.push({
                pathname: "/location/detail",
                params: { id: data?.location?.id },
              })
            }
          >
            <Image
              source={{
                uri: data?.location?.images[0]?.imageUrl,
              }}
              style={styles.image}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.name}>{data?.location?.name}</Text>
              <View style={styles.row}>
                <Ionicons name="location-sharp" size={16} color="#7C3AED" />
                <Text style={styles.city}>{data?.location?.district}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <HotDeals items={services} title="Similiar Services" istreatment />
      </ScrollView>
      <View style={styles.fixedButton}>
        <TreatmentActionButton
          padding={12}
          fontSize={12}
          paddingVertical={12}
          handleAddCartProduct={handleAddCartProduct}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedButton: {
    borderColor: "#eee",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    height: 90,
    marginTop: 30,
  },

  image: {
    width: "45%",
    height: "100%",
  },

  infoContainer: {
    width: "55%",
    padding: 10,
    justifyContent: "center",
  },

  name: {
    fontSize: 14, // lebih kecil
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  city: {
    marginLeft: 4,
    fontSize: 12, // lebih kecil
    color: "#555",
  },
});

export default TreatmentDetailScreen;
