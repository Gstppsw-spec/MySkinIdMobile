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

const fetctFavorites = async (id: string): Promise<Favorite> => {
  const { data } = await apiClient.get(`/v2/favorite/${id}`);
  return data?.data;
};

export const useFavorites = (id: string) =>
  useQuery({
    queryKey: ["favorite", id],
    queryFn: () => fetctFavorites(id!),
    enabled: !!id,
  });
