import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { SkinAnalysisData } from "./types";

const fetchSkinAnalys = async (id: string): Promise<SkinAnalysisData> => {
  const { data } = await apiClient.get(`/v2/skin-analysis/latest/${id}`);
  return data?.data;
};

export function useSkinAnalys(customerId?: string | null) {
    console.log(customerId);
    
  return useQuery({
    queryKey: ["skin-analysis", customerId],
    queryFn: () => fetchSkinAnalys(customerId!),
    enabled: typeof customerId === "string" && customerId.length > 0,
  });
}
