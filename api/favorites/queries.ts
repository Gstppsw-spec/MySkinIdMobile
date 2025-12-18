import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface Location {
  name: string;
  id: string;
}

interface Service {
  name: string;
  id: string;
}

interface Product {
  name: string;
  id: string;
}

export interface Favorite {
  location: Location[];
  service: Service[];
  product: Product[];
}

const fetchFavorites = async (id: string): Promise<Favorite> => {
  const { data } = await apiClient.get(`/v2/favorite/${id}`);
  return data?.data;
};

export function useFavorites(customerId?: string | null) {
  return useQuery({
    queryKey: ["favorites", customerId],
    queryFn: () => fetchFavorites(customerId!), 
    enabled: typeof customerId === "string" && customerId.length > 0,
  });
}
