import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

interface CarouselProps {
  images: any;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  paddingHorizontal?: number;
}

const CarouselComponent: React.FC<CarouselProps> = ({ images }: any) => {
  const progressValue = useSharedValue(0);

  if (images.length === 0) return null;

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={200}
        data={images}
        scrollAnimationDuration={1000}
        autoPlay
        autoPlayInterval={3000}
        pagingEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }: any) => {
          const startX = useRef(0);
          const startY = useRef(0);
          let moved = false;

          return (
            <Pressable
              onPress={() => {
                if (!moved) {
                  WebBrowser.openBrowserAsync(
                    "https://eudoraclinic.com/2024/01/29/rekomendasi-basic-skincare-untuk-pemula",
                    {
                      enableBarCollapsing: true,
                      showTitle: true,
                    }
                  );
                }
              }}
              onPressIn={(e) => {
                startX.current = e.nativeEvent.pageX;
                startY.current = e.nativeEvent.pageY;
                moved = false;
              }}
              onPressOut={(e) => {
                const dx = Math.abs(e.nativeEvent.pageX - startX.current);
                const dy = Math.abs(e.nativeEvent.pageY - startY.current);
                if (dx > 10 || dy > 10) {
                  moved = true;
                }
              }}
              style={{
                flex: 1,
                backgroundColor: "#ccc",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: `${item?.uri}` }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </Pressable>
          );
        }}
      />
      <View style={styles.indicatorContainer}>
        {images?.map((_: any, i: any) => (
          <IndicatorDot key={i} index={i} progressValue={progressValue} />
        ))}
      </View>
    </View>
  );
};

const IndicatorDot = ({ index, progressValue }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progressValue.value,
      [index - 1, index, index + 1],
      [0.3, 1, 0.3],
      "clamp"
    );
    const scale = interpolate(
      progressValue.value,
      [index - 1, index, index + 1],
      [1, 1.5, 1],
      "clamp"
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    height: 220,
    position: "relative",
    marginTop: width / 4
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 14,
    backgroundColor: "#000",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
