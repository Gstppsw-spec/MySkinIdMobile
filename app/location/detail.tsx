import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import HeaderDetail from "@/components/location/headerDetail";
import ImageGallery from "@/components/location/imageGallery";
import ClinicInfo from "@/components/location/locationInfo";
import ServiceTabs from "@/components/location/serviceTabs";
import { FlatList } from "react-native-gesture-handler";
import { useLocation } from "@/api/location";
import DataStateView from "@/components/common/DataStateView";
import ClinicDetailSkeleton from "@/components/location/locationDetailSkeleton";
import { PayloadFavorite, useAddFavorite } from "@/api/favorites";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

const { width } = Dimensions.get("window");

export default function ClinicDetail() {
  const { id } = useLocalSearchParams();
  const customerId = useAuthStore((state) => state.customerId);
  const [showClinicName, setShowClinicName] = useState<boolean>(false);
  const { data, isLoading, isError, refetch } = useLocation(id as any);
  const location = data?.data || [];
  const [scrollY, setScrollY] = useState(0);
  const [headerBackground, setHeaderBackground] = useState("transparent");
  const [iconColor, setIconColor] = useState("#fff");
  const [buttonBackground, setButtonBackground] = useState("rgba(0,0,0,0.5)");
  const queryClient = useQueryClient();

  const favoriteMutation = useAddFavorite();

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y);

    const headerScrollDistance = 275;

    const bgOpacity = Math.min(1, y / headerScrollDistance);
    setHeaderBackground(`rgba(255,255,255,${bgOpacity})`);

    const newIconColor = y > headerScrollDistance - 30 ? "#000" : "#fff";
    setIconColor(newIconColor);

    const newButtonBg =
      y > headerScrollDistance - 30 ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.5)";
    setButtonBackground(newButtonBg);

    const showClinic = y > headerScrollDistance ? true : false;
    setShowClinicName(showClinic);
  };

  const hasData = data && data?.status;

  if (isError || isLoading) {
    return <ClinicDetailSkeleton />;
  }

  const handleFavorite = () => {
    const payload: PayloadFavorite = {
      customerId: customerId as string,
      refferenceId: id as string,
      favoriteType: "location",
    };

    favoriteMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: data?.message,
        });
        queryClient.invalidateQueries({ queryKey: ["location", id, customerId] });
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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <DataStateView
        isLoading={isLoading}
        isError={isError}
        data={location}
        onRetry={refetch}
        emptyMessage="Gagal mendapatkan detail."
      />

      {!isLoading && !isError && hasData && (
        <HeaderDetail
          clinicId={location?.id}
          clinicName={location?.name}
          headerBackground={headerBackground}
          iconColor={iconColor}
          buttonBackground={buttonBackground}
          showClinicName={showClinicName}
          handleFavorite={handleFavorite}
          isFavorite={location?.isFavorite}
        />
      )}

      {!isLoading && !isError && hasData && (
        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy"}
          ListHeaderComponent={
            <>
              <Image
                source={{ uri: location?.images[0]?.imageUrl }}
                style={{ width, height: 250 }}
                resizeMode="cover"
              />
              <ImageGallery images={location.images} />
              <ClinicInfo clinic={location} />
              <ServiceTabs clinicId={location.id} />
            </>
          }
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
