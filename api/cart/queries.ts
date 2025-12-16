import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { ProductCartItem, ServiceCartItem } from "./types";
export interface CartResponse {
  id: string;
  productId?: string;
  serviceId?: string;
  customerId: string;
}

const fetchCustomerServiceCart = async (id: string): Promise<ServiceCartItem[]> => {
  const { data } = await apiClient.get(`/v2/cart/service/${id}`);
    console.log(data);
  
  return data?.data;
};


export const useCustomerServiceCart = (id?: string) =>
  useQuery({
    queryKey: ["cart-service", id],
    queryFn: () => fetchCustomerServiceCart(id!),
    enabled: !!id,
  });


const fetchCustomerProductCart = async (id: string): Promise<ProductCartItem[]> => {
  const { data } = await apiClient.get(`/v2/cart/product/${id}`);
  return data?.data;
};


export const useCustomerProductCart = (id?: string) =>
  useQuery({
    queryKey: ["cart-product", id],
    queryFn: () => fetchCustomerProductCart(id!),
    enabled: !!id,
  });