import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import {
  AddConsultationMessage,
  ConsultationCategory,
  ConsultationMessage,
  ConsultationRoom,
} from "./types";

const fetchCategoryConsultation = async (): Promise<ConsultationCategory[]> => {
  const { data } = await apiClient.get("/v2/category/consultations");
  return data?.data;
};

const fetchConsultationCategoryById = async (
  id: string
): Promise<ConsultationCategory> => {
  const { data } = await apiClient.get(`/v2/category/consultations/${id}`);
  return data?.data;
};

export const useConsultationCategory = () =>
  useQuery({
    queryKey: ["consultation-categorys"],
    queryFn: fetchCategoryConsultation,
  });

export const useConsultationCategoryById = (id?: string) =>
  useQuery({
    queryKey: ["v2/category/consultations", id],
    queryFn: () => fetchConsultationCategoryById(id!),
    enabled: !!id,
  });

const fetchConsultationRoomByUserId = async (
  id: string
): Promise<ConsultationCategory[]> => {
  const { data } = await apiClient.get(`/v2/consultation/room/user/${id}`);
  return data?.data;
};

// ✅ React Query Hook
export const useConsultationRoomByUserId = (id?: string) =>
  useQuery({
    queryKey: ["consultation-room-user", id],
    queryFn: () => fetchConsultationRoomByUserId(id!),
    enabled: !!id, // hanya jalan kalau id ada
  });

const fetchConsultationByRoomId = async (
  id: string
): Promise<ConsultationRoom> => {
  const { data } = await apiClient.get(`/v2/consultation/room/${id}`);
  return data?.data;
};

export const useConsultationByRoomId = (id?: string) =>
  useQuery({
    queryKey: ["consultation-room", id],
    queryFn: () => fetchConsultationByRoomId(id!),
    enabled: !!id,
  });

const fetchConsultationMessage = async (
  id: string
): Promise<ConsultationMessage[]> => {
  const { data } = await apiClient.get(`/v2/consultation/room/${id}/messages`);
  return data?.data ?? [];
};

export const useConsultationMessage = (id?: string) =>
  useQuery({
    queryKey: ["consultation-room-messages", id],
    queryFn: () => fetchConsultationMessage(id!),
    enabled: !!id,
    initialData: [],
  });

const fetchMediaConsultationByRoomId = async (
  id: string
): Promise<ConsultationCategory[]> => {
  const { data } = await apiClient.get(`/v2/consultation/room/${id}/media`);
  return data?.data;
};

// ✅ React Query Hook
export const useMediaConsultationByRoomId = (id?: string) =>
  useQuery({
    queryKey: ["consultation-room-user", id],
    queryFn: () => fetchMediaConsultationByRoomId(id!),
    enabled: !!id, // hanya jalan kalau id ada
  });
