import { useQuery } from "@tanstack/react-query";
import apiClientTesting from "../apiClientTesting";
import { Provinces, Villages, Districs, Regencies } from "./types";

const fetchProvinces = async (): Promise<Provinces[]> => {
  const { data } = await apiClientTesting.get("/provinces.json");
  return data?.data;
};

export const useProvinces = () =>
  useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces,
  });

const fetchRegencies = async (id: string): Promise<Regencies> => {
  const { data } = await apiClientTesting.get(`/regencies/${id}.json`);
  return data?.data;
};

export const useRegencies = (id?: string) =>
  useQuery({
    queryKey: ["regencies", id],
    queryFn: () => fetchRegencies(id!),
    enabled: !!id,
  });

const fetchDistricts = async (id: string): Promise<Districs> => {
  const { data } = await apiClientTesting.get(`/districts/${id}.json`);
  return data?.data;
};

export const useDistricts = (id?: string) =>
  useQuery({
    queryKey: ["districts", id],
    queryFn: () => fetchDistricts(id!),
    enabled: !!id,
  });

const fetchVillages = async (id: string): Promise<Villages> => {
  const { data } = await apiClientTesting.get(`/villages/${id}.json`);
  return data?.data;
};

export const useVillages = (id?: string) =>
  useQuery({
    queryKey: ["villages", id],
    queryFn: () => fetchVillages(id!),
    enabled: !!id,
  });
