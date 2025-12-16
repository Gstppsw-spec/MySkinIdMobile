import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "../../store/authStore";

// ===== TYPES =====
export interface UserPayload {
  name: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  googleId?: string;
  loginMethod?: string;
  countryCode?: string;
  otpType?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  jwtToken?: string;
  [key: string]: any;
}

export interface LoginPayload {
  email?: string;
  phoneNumber?: string;
  password?: string;
  googleId?: string;
}

export interface VerifyPayload {
  otp?: any;
  customerId: string;
}

// ===== CREATE USER =====
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UserPayload): Promise<User> => {
      const { data } = await apiClient.post("/api/v2/auth-customer", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ===== LOGIN USER =====
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload): Promise<User> => {
      
      const { data } = await apiClient.post("/v2/auth-customer/login", payload);
      return data;
    },
  });
};

export const useVerificationCode = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: async (payload: VerifyPayload): Promise<User> => {
      
      const { data } = await apiClient.post(
        "/v2/auth-customer/verifyOtp",
        payload
      );
      return data;
    },
    onSuccess: (response) => {
      const customerId = response.data.id;
      const token = response.data.jwtToken;
      setAuth(customerId, token);
    },
  });
};

export const userResendVerificationCode = () => {
  return useMutation({
    mutationFn: async (payload: VerifyPayload): Promise<User> => {
      
      const { data } = await apiClient.post(
        "/v2/auth-customer/resendOtpAuthentication",
        payload
      );
      return data;
    },
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: async (payload: UserPayload): Promise<User> => {
      console.log(payload);
      
      
      const { data } = await apiClient.post(
        "/v2/auth-customer/register",
        payload
      );
      return data;
    },
  });
};
