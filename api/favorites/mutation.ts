import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "@/store/authStore";

export interface PayloadFavorite {
  refferenceId: string;
  customerId: string;
  favoriteType: string;
  message?: string;
}

export const addFavorite = async (
  payload: Omit<PayloadFavorite, "id">
): Promise<PayloadFavorite> => {
  const { data } = await apiClient.post("/v2/favorite", payload);
  return data;
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation<PayloadFavorite, Error, Omit<PayloadFavorite, "id">>({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
