import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Location } from "./types";
import { useAuthStore } from "@/store/authStore";

const fetchLocation = async (customerId: string): Promise<Location[]> => {
  const { data } = await apiClient.get(
    `/v2/location/all-customer/${customerId}`
  );
  return data?.data;
};

const fetchLocationById = async (
  id: string,
  customerId?: string
): Promise<Location> => {
  const { data } = await apiClient.get(
    `/v2/location/${id}/detail-customer/${customerId}`
  );
  return data;
};

export const useLocations = () => {
  const customerId = useAuthStore((state) => state.customerId);
  return useQuery({
    queryKey: ["locations", customerId],
    queryFn: () => fetchLocation(customerId!),
    enabled: !!customerId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useLocation = (id?: string) => {
  const customerId = useAuthStore((state) => state.customerId);

  return useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchLocationById(id!),
    enabled: !!id,
  });
};
