import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "@/store/authStore";

export interface CartPayload {
  id: string;
  productId?: string;
  serviceId?: string;
  customerId?: string;
  type?: "increase" | "reduce" | string;
}

export const addCartProduct = async (
  payload: Omit<CartPayload, "id">
): Promise<CartPayload> => {
  const customerId = useAuthStore.getState().customerId;

  const payloadCart = {
    ...payload,
    customerId,
  };

  const { data } = await apiClient.post("/v2/cart/product", payloadCart);
  return data?.data;
};

export const useAddCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<CartPayload, Error, Omit<CartPayload, "id">>({
    mutationFn: addCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};

export const addCartService = async (
  payload: Omit<CartPayload, "id">
): Promise<CartPayload> => {
  const customerId = useAuthStore.getState().customerId;

  const payloadCart = {
    ...payload,
    customerId,
  };

  const { data } = await apiClient.post("/v2/cart/service", payloadCart);
  return data?.data;
};

export const useAddCartService = () => {
  const queryClient = useQueryClient();
  return useMutation<CartPayload, Error, Omit<CartPayload, "id">>({
    mutationFn: addCartService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};

export const deleteCartProduct = async (cartId: string): Promise<void> => {
  await apiClient.delete(`/v2/cart/product/delete/${cartId}`);
};

export const useDeleteCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};

export const deleteCartService = async (cartId: string): Promise<void> => {
  await apiClient.delete(`/v2/cart/service/delete/${cartId}`);
};

export const useDeleteCartService = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteCartService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};

export const updateCartProduct = async (
  payload: Omit<CartPayload, "id">
): Promise<CartPayload> => {
  const customerId = useAuthStore.getState().customerId;

  const payloadCart = {
    ...payload,
    customerId,
  };

  if (payload.type == "increase") {
    const { data } = await apiClient.post("/v2/cart/product/add", payloadCart);
    return data?.data;
  }
  if (payload.type == "reduce") {
    const { data } = await apiClient.post(
      "/v2/cart/product/reduce",
      payloadCart
    );
    return data?.data;
  }

  throw new Error("Unknown update type");
};

export const useUpdateCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<CartPayload, Error, Omit<CartPayload, "id">>({
    mutationFn: updateCartProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};

export const selectCartProduct = async (cartId: string) => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.put(`/v2/cart/product/select/${cartId}`, {
    customerId,
  });
  return data;
};

export const useSelectCartProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => selectCartProduct(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};

export const selectAllCartProduct = async () => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.put(
    `/v2/cart/product/select-all/${customerId}`
  );
  return data;
};

export const useSelectAllCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => selectAllCartProduct(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};

export const deleteAllCartProduct = async () => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.delete(
    `/v2/cart/product/delete-all/${customerId}`
  );
  return data;
};

export const useDeleteAllCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllCartProduct(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart-product"] });
    },
  });
};





export const updateCartService = async (
  payload: Omit<CartPayload, "id">
): Promise<CartPayload> => {
  const customerId = useAuthStore.getState().customerId;

  const payloadCart = {
    ...payload,
    customerId,
  };

  if (payload.type == "increase") {
    const { data } = await apiClient.post("/v2/cart/service/add", payloadCart);
    return data?.data;
  }
  if (payload.type == "reduce") {
    const { data } = await apiClient.post(
      "/v2/cart/service/reduce",
      payloadCart
    );
    return data?.data;
  }

  throw new Error("Unknown update type");
};

export const useUpdateCartService = () => {
  const queryClient = useQueryClient();
  return useMutation<CartPayload, Error, Omit<CartPayload, "id">>({
    mutationFn: updateCartService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};


export const selectCartService = async (cartId: string) => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.put(`/v2/cart/service/select/${cartId}`, {
    customerId,
  });
  return data;
};

export const useSelectCartService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => selectCartService(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};


export const selectAllCartService = async () => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.put(
    `/v2/cart/service/select-all/${customerId}`
  );
  return data;
};

export const useSelectAllCartService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => selectAllCartService(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};


export const deleteAllCartService = async () => {
  const customerId = useAuthStore.getState().customerId;
  const { data } = await apiClient.delete(
    `/v2/cart/service/delete-all/${customerId}`
  );
  return data;
};

export const useDeleteAllCartService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllCartService(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart-service"] });
    },
  });
};


