import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import HeaderDefault from "@/components/HeaderDefault";
import PopUpUpdate from "@/components/popUpUpdate";
import Carousel from "@/components/home/carousel";
import { LinearGradient } from "expo-linear-gradient";
import CategoryConsultationComponent from "@/components/home/category_consultation";
import { useLocations } from "@/api/location";
import { useConsultationCategory } from "@/api/consultation";
import HotDeals from "@/components/hotdeals/hotDeals";
import { useProducts } from "@/api/product";
import { useServices } from "@/api/service";

export default function HomeScreen() {
  const [scrollY, setScrollY] = useState(0);
  const [headerBackground, setHeaderBackground] = useState("transparent");
  const [borderRadius, setBorderRadius] = useState(40);
  const [margin, setMargin] = useState(10);

  const {
    data: locations,
    isLoading: isLoadingLocations,
    refetch: refetchLocations,
    isRefetching: isRefetchingLocations,
  } = useLocations();

  const {
    data: products,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
    isError: isErrorProducts,
  } = useProducts();

  const {
    data: consultationCategory,
    isLoading: isLoadingConsultationCategory,
    refetch: refetchConsultationCategory,
    isError: isErrorConsultationCategory,
  } = useConsultationCategory();

  const {
    data: services,
    isLoading: isLoadingServices,
    refetch: refetchServices,
    isRefetching: isRefetchingServices,
    isError: isErrorServices,
  } = useServices();

  const images = [
    {
      id: 1,
      uri: "https://api.myskin.blog/uploads/1.jpg",
    },
    {
      id: 2,
      uri: "https://api.myskin.blog/uploads/2.jpg",
    },
    {
      id: 3,
      uri: "https://api.myskin.blog/uploads/3.jpg",
    },
    {
      id: 4,
      uri: "https://api.myskin.blog/uploads/4.jpg",
    },
  ];

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y);
    const headerScrollDistance = 24;
    const newBorder = y > headerScrollDistance ? 0 : 40;
    setBorderRadius(newBorder);

    const newBackgroud = y > headerScrollDistance ? "#FFF" : "transparent";
    setHeaderBackground(newBackgroud);

    const newMargin = y > headerScrollDistance ? 0 : 10;
    setMargin(newMargin);
  };

  const onRefresh = () => {
    refetchProducts();
    refetchConsultationCategory();
    refetchLocations();
    refetchServices();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PopUpUpdate />
      <HeaderDefault
        border={borderRadius}
        margin={margin}
        background={headerBackground}
      />
      <ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingProducts}
            onRefresh={onRefresh}
            colors={["#2B1D4A"]}
            tintColor="#2B1D4A"
            progressViewOffset={70}
          />
        }
      >
        <LinearGradient colors={["#6C1FC7", "#6C1FC7", "#6C1FC7"]}>
          <Carousel images={images} autoSlideInterval={4000} />
        </LinearGradient>

        {consultationCategory && consultationCategory?.length > 0 && (
          <CategoryConsultationComponent
            category_consultation={consultationCategory}
          />
        )}

        {services && services?.length > 0 && (
          <HotDeals
            items={services}
            title="🔥 Top Deals Treatment For You"
            istreatment
          />
        )}

        {products && products?.length > 0 && (
          <HotDeals
            items={products}
            title="🔥 Top Deals Product For You"
            isproduct
          />
        )}

        {locations && locations?.length > 0 && (
          <HotDeals
            items={locations}
            title="Discover Premium Clinics"
            islocation
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
