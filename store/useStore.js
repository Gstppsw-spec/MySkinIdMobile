import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      employeeDetails: {
        employeeid: null,
        employeename: null,
        employeenip: null,
        token: null,
      },
      mainCategoryId: null,
      roomConsultationId: null,

      clearEmployeeDetails: () =>
        set({
          employeeDetails: {
            employeeid: null,
            employeename: null,
            employeenip: null,
            token: null,
          },
        }),

      setMainCategoryId: (id) => set({ mainCategoryId: id }),
      setRoomConsultationId: (id) => set({ roomConsultationId: id }),

      setEmployeeDetails: (details) =>
        set((state) => ({
          employeeDetails: {
            ...state.employeeDetails,
            ...details,
          },
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
