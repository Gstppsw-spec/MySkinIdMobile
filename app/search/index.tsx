import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { Easing } from "react-native-reanimated";
import { styles } from "./../../components/search/styles";
import Header from "@/components/search/header";
import LoadingState from "@/components/search/loadingState";
import TreatmentItemCard from "@/components/search/treatmentItemCard";
import EmptyState from "@/components/search/emptyState";
import InitialState from "@/components/search/initialState";
import ButtonCategory from "@/components/search/buttonCategory";
import ConsultationHeader from "@/components/header/consultationHeader";
import SearchTabs from "@/components/search/searchTab";
import { useSearchStore } from "@/store/searchStore";
import HotDealCardProduct from "@/components/hotdeals/hotDealsCardProduct";
import ProductCard from "@/components/product/productCard";
import { treatment } from "../../components/treatment/dummyTreatments";
import HotDealCard from "@/components/hotdeals/hotDealsCard";
import TreatmentCard from "@/components/treatment/treatmentCard";
import LocationCard from "@/components/location/locationCard";
import { useLocations } from "@/api/location";
import { useProducts } from "@/api/product";
import { useServices } from "@/api/service";

interface TreatmentItem {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: string;
  rating?: number;
  reviews?: number;
}
const SPACING = 16;
const ITEM_MIN_WIDTH = 160;
const { width } = Dimensions.get("window");
const numColumns = Math.floor(width / (ITEM_MIN_WIDTH + SPACING));
export default function SearchScreen() {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TreatmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | any>(null);
  const activeTab = useSearchStore((state) => state.activeTab);
  const setActiveTab = useSearchStore((state) => state.setActiveTab);

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
    data: services,
    isLoading: isLoadingServices,
    refetch: refetchServices,
    isRefetching: isRefetchingServices,
    isError: isErrorServices,
  } = useServices();


  const handleSearch = (text: string) => {
    setQuery(text);
    if (timer) clearTimeout(timer);

    if (text.trim().length === 0) {
      setFilteredData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const newTimer = setTimeout(() => {
      setLoading(false);
    }, 500);

    setTimer(newTimer);
  };

  const handleChooseLocation = () => router.push("/filter_location");
  const handleBack = () => router.back();
  const clearSearch = () => {
    setQuery("");
    setFilteredData([]);
  };

  const onClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ConsultationHeader title="Search" />
      <SearchTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      <Header
        query={query}
        onBack={handleBack}
        onSearch={handleSearch}
        onClear={clearSearch}
        onChooseLocation={handleChooseLocation}
        activeTab={activeTab}
      />

      <View style={styles.resultsSection}>
        {activeTab === "Product" ? (
          <FlatList
            key={activeTab}
            data={products}
            keyExtractor={(item: any) => item?.id.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => <ProductCard item={item} />}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            contentContainerStyle={styles.listContent}
          />
        ) : activeTab == "Services" ? (
          <FlatList
            key={activeTab}
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TreatmentCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            key={activeTab}
            data={locations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <LocationCard item={item} isfull={true} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <ButtonCategory onClose={onClose} activeTab={activeTab} />
    </View>
  );
}
