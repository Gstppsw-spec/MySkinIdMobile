import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "@/store/authStore";

export interface Service {
  name: string;
  location: any;
  id: string;
  isFavorite: boolean
}

const fetchServices = async (): Promise<Service[]> => {
  const customerId = useAuthStore.getState().customerId;

  const { data } = await apiClient.get(
    `/v2/service/all-customer/${customerId}`
  );
  return data?.data;
};

export const useServices = () =>
  useQuery({
    queryKey: ["service", "customer"],
    queryFn: fetchServices,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

const fetchServiceById = async (id: string): Promise<Service> => {
  const customerId = useAuthStore.getState().customerId;

  const { data } = await apiClient.get(
    `/v2/service/${id}/detail-customer/${customerId}`
  );
  return data?.data;
};

export const useServiceById = (id?: string) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: () => fetchServiceById(id!),
    enabled: !!id,
  });

const fetchServiceByLocationId = async (id: string): Promise<Service[]> => {
  const { data } = await apiClient.get(`/v2/service/location/${id}`);
  return data?.data;
};

export const useServiceByLocationId = (id?: string) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: () => fetchServiceByLocationId(id!),
    enabled: !!id,
  });
