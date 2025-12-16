import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import HotDealsHeader from "./hotDealsHeader";
import HotDealCard from "./hotDealsCard";
import HotDealCardProduct from "./hotDealsCardProduct";
import { useSearchStore } from "@/store/searchStore";
import LocationCard from "../location/locationCard";

const { width } = Dimensions.get("window");

const HotDeals = ({
  items,
  title,
  istreatment = false,
  isproduct = false,
  islocation = false,
}: any) => {
  const previewData = items?.slice(0, 4) || [];
  const CARD_WIDTH = width * 0.75;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const setActiveTab = useSearchStore((state) => state.setActiveTab);

  const onSeeAll = () => {
    if (istreatment) {
      setActiveTab("Services");
    } else if (isproduct) {
      setActiveTab("Product");
    } else if (islocation) {
      setActiveTab("Shop");
    }
    router.push("/search");
  };

  return (
    <View style={styles.wrapper}>
      <HotDealsHeader title={title} onViewAll={onSeeAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {previewData.map((item: any, index: number) => (
          <View key={index} style={styles.cardWrapper}>
            {istreatment && <HotDealCard item={item} />}

            {isproduct && <HotDealCardProduct item={item} />}
            {islocation && <LocationCard item={item} isfull={false}/>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HotDeals;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 6,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "stretch", // penting agar card tidak collapse
  },
  cardWrapper: {
    position: "relative",
  },
});
