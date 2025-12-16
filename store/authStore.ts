import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  customerId: string | null;
  token: string | null;
  setAuth: (customerId: string, token: string) => void;
  logout: () => void;
}

// Adapter yang sudah serialize / deserialize
const asyncStorageAdapter: PersistStorage<AuthState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customerId: null,
      token: null,
      setAuth: (customerId, token) => set({ customerId, token }),
      logout: () => set({ customerId: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: asyncStorageAdapter,
    }
  )
);
