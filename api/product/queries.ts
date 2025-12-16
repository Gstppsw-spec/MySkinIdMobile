import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "@/store/authStore";

export interface Product {
  name: string;
  // tambahkan field lain jika ada
}

/* ===========================
   GET ALL PRODUCTS by CUSTOMER
   =========================== */
const fetchProducts = async (): Promise<Product[]> => {
  const customerId = useAuthStore.getState().customerId;

  const { data } = await apiClient.get(
    `/v2/product/all-customer/${customerId}`
  );

  return data?.data;
};

export const useProducts = () =>
  useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

/* ===========================
    GET PRODUCT DETAIL by ID + CUSTOMER
   =========================== */
const fetchProductById = async (id: string): Promise<Product> => {
  const customerId = useAuthStore.getState().customerId;

  const { data } = await apiClient.get(
    `/v2/product/${id}/detail-customer/${customerId}`
  );

  return data?.data;
};

export const useProductById = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
