import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";

export const createSkinAnalys = async (formData: FormData) => {
  const { data } = await apiClient.post(`/v2/skin-analysis/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data?.data;
};

export const useCreateSkinAnalys = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkinAnalys,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skin-analysis"],
      });
    },
  });
};
