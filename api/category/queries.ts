import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { MainCategory, SubCategory } from "./types";

const fetchMainCategory = async (): Promise<MainCategory[]> => {
  const { data } = await apiClient.get("/mainCategoryService");
  return data?.data;
};

const fetchMainCategoryById = async (id: string): Promise<MainCategory> => {
  const { data } = await apiClient.get(`/mainCategoryService/${id}`);
  return data?.data;
};

export const useMainCategorys = () =>
  useQuery({
    queryKey: ["mainCategoryServices"],
    queryFn: fetchMainCategory,
  });

export const useMainCategory = (id?: string) =>
  useQuery({
    queryKey: ["mainCategoryService", id],
    queryFn: () => fetchMainCategoryById(id!),
    enabled: !!id,
  });
