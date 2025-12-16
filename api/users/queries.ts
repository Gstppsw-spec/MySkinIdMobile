import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { User } from "./types";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get("/users");
  return data;
};

const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
};

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

export const useUser = (id?: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
  });
