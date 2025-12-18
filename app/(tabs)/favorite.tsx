import {
  SafeAreaView,
  View,
  useColorScheme,
  FlatList,
  Dimensions,
} from "react-native";
import useStore from "@/store/useStore";
import RequiredLogin from "@/components/required/required_login";
import { useAuthStore } from "@/store/authStore";
import ConsultationHeader from "@/components/header/consultationHeader";
import SearchTabs from "@/components/search/searchTab";
import { useSearchStore } from "@/store/searchStore";
import ProductCard from "@/components/product/productCard";
import TreatmentCard from "@/components/treatment/treatmentCard";
import LocationCard from "@/components/location/locationCard";
import { styles } from "./../../components/search/styles";
import { treatment } from "../../components/treatment/dummyTreatments";
import { useLocations } from "@/api/location";
import { useProducts } from "@/api/product";
import { useServices } from "@/api/service";
import { useFavorites } from "@/api/favorites";
import DataStateView from "@/components/common/DataStateView";

const SPACING = 16;
const ITEM_MIN_WIDTH = 160;
const { width } = Dimensions.get("window");
const numColumns = Math.floor(width / (ITEM_MIN_WIDTH + SPACING));

export default function FavoriteScreen() {
  const customerId = useAuthStore((state) => state.customerId);
  const activeTab = useSearchStore((state) => state.activeTab);
  const setActiveTab = useSearchStore((state) => state.setActiveTab);

  const {
    data: favorites,
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = useFavorites(customerId);

  if (!customerId) {
    return <RequiredLogin />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFF" }]}>
      <ConsultationHeader title="Favorite" />
      <SearchTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      <View style={styles.resultsSection}>
        {activeTab === "Product" ? (
          <>
            <DataStateView
              isLoading={isLoading}
              isError={isError}
              data={favorites?.product}
              onRetry={refetch}
              emptyMessage="Tidak ada data favorite produk."
            />
            <FlatList
              key={activeTab}
              data={favorites?.product}
              keyExtractor={(item: any) => item.id.toString()}
              numColumns={numColumns}
              renderItem={({ item }) => <ProductCard item={item} />}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 16,
              }}
              contentContainerStyle={styles.listContent}
            />
          </>
        ) : activeTab == "Services" ? (
          <>
            <DataStateView
              isLoading={isLoading}
              isError={isError}
              data={favorites?.service}
              onRetry={refetch}
              emptyMessage="Tidak ada data favorite service."
            />
            <FlatList
              key={activeTab}
              data={favorites?.service}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <TreatmentCard item={item} />}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            <DataStateView
              isLoading={isLoading}
              isError={isError}
              data={favorites?.location}
              onRetry={refetch}
              emptyMessage="Tidak ada data favorite outlet."
            />
            <FlatList
              key={activeTab}
              data={favorites?.location}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <LocationCard item={item} isfull={true} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
