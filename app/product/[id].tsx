import ProductActionButton from "@/components/product/productActionButton";
import ProductDescription from "@/components/product/productDescription";

import ProductImages from "@/components/product/productImage";
import ProductInformation from "@/components/product/productInformation";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View, StyleSheet, StatusBar } from "react-native";
import { products } from "../../components/product/dummyProduct";
import HeaderBack from "@/components/header/HeaderBack";
import ProductImageHeader from "@/components/product/header";
import ReviewComponent from "@/components/common/review";
import HotDeals from "@/components/hotdeals/hotDeals";
import { useProductById, useProducts } from "@/api/product";
import ProductDetailSkeleton from "@/components/product/productDetailSkeleton";
import { PayloadFavorite, useAddFavorite } from "@/api/favorites";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import Toast from "react-native-toast-message";
import { useAddCartProduct } from "@/api/cart";

interface Product {
  name: string;
}

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: products,
    isLoading: isLoadingProducts,
    refetch: refetchProducts,
    isRefetching: isRefetchingProducts,
  } = useProducts();
  const { data, isLoading, isError } = useProductById(id as string);
  const queryClient = useQueryClient();
  const customerId = useAuthStore((state) => state.customerId);

  const favoriteMutation = useAddFavorite();
  const cartProductMutation = useAddCartProduct();

  const product: any = data || [];

  const isEmptyData = !data;
  const isLoadingState =
    isLoading ||
    isRefetchingProducts ||
    isEmptyData ||
    isLoadingProducts ||
    isError;

  if (isLoadingState) return <ProductDetailSkeleton />;

  const handleFavorite = () => {
    const payload: PayloadFavorite = {
      customerId: customerId as string,
      refferenceId: id as string,
      favoriteType: "product",
    };

    favoriteMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: data?.message,
        });
        queryClient.invalidateQueries({ queryKey: ["product", id] });
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
      productId: id as string,
    };

    cartProductMutation.mutate(payload, {
      onSuccess: (data) => {
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil menambahkan product ke cart",
        });
      },
      onError: (err) => {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal menambahkan product ke cart",
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
      <ProductImageHeader
        title={product?.name}
        handleFavorite={handleFavorite}
        isFavorite={product?.isFavorite}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ProductImages images={product?.images} />
        <View style={{ padding: 16 }}>
          <ProductInformation
            price={product.price}
            discountPercent={product.discountPercent}
            priceDiscount={product.priceDiscount}
            isPrescriptionRequired={product.isPrescriptionRequired}
            name={product.name}
            rating={5}
            sold={1000}
          />
          <ProductDescription details={product} />
        </View>

        {products && products?.length > 0 && (
          <HotDeals items={products} title={"Simmiliar Product"} isproduct />
        )}

        {/* <View style={{ padding: 16 }}>
          <ReviewComponent reviews={1000} rating={5} />
        </View> */}
      </ScrollView>

      <View style={styles.fixedButton}>
        <ProductActionButton
          handleAddCartProduct={handleAddCartProduct}
          isPrescriptionRequired={product.isPrescriptionRequired}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedButton: {
    borderColor: "#eee",
  },
});

export default ProductDetailScreen;
