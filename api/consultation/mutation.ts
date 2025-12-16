import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import type { AddConsultationMessage, ConsultationMutation } from "./types";

export const createConsultationRoom = async (
  payload: Omit<ConsultationMutation, "id">
): Promise<ConsultationMutation> => {
  const { data } = await apiClient.post("/v2/consultation/room", payload);
  return data?.data;
};

export const useCreateConsultationRoom = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ConsultationMutation,
    Error,
    Omit<ConsultationMutation, "id">
  >({
    mutationFn: createConsultationRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultation-room-user"] });
    },
  });
};

export const createConsultationMessage = async (
  payload: Omit<AddConsultationMessage, "id">
): Promise<AddConsultationMessage> => {
  const { data } = await apiClient.post(
    `/v2/consultation/room/${payload.roomId}/message`,
    payload
  );
  return data?.data;
};

export const useCreateConsultationMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AddConsultationMessage,
    Error,
    Omit<AddConsultationMessage, "id">
  >({
    mutationFn: createConsultationMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultation-room-messages"],
      });
    },
  });
};

export const createConsultationImageMessage = async (formData: FormData) => {
  const roomId = formData.get("roomId");
  const { data } = await apiClient.post(
    `/v2/consultation/room/${roomId}/message/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data?.data;
};

export const useCreateConsultationImageMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConsultationImageMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultation-room-messages"],
      });
    },
  });
};
