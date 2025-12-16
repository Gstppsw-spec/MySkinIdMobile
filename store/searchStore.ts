import { create } from "zustand";
import { persist } from "zustand/middleware";

type TabType = "Product" | "Services" | "Shop";
type SortByType = "recomended" | "distance";

interface SearchParams {
  activeTab: TabType;
  category: string[];
  priceRange: { min: number; max: number };
  location: string;
  latitude?: number;
  longitude?: number;
  sortBy: SortByType;
  maxDistance: number;

  setActiveTab: (tab: TabType) => void;
  setCategory: (category: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setLocation: (loc: string) => void;
  setCoordinates: (lat: number, lng: number) => void;
  setSortBy: (sort: SortByType) => void;
  setMaxDistance: (distante: number) => void;
  reset: () => void; // reset ke default
}

const defaultState = {
  activeTab: "Product" as TabType,
  category: [] as string[],
  priceRange: { min: 0, max: 1000000 },
  location: "",
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
  sortBy: "recomended" as SortByType,
  maxDistance: 5,
};

export const useSearchStore = create<SearchParams>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setActiveTab: (tab) => set({ activeTab: tab }),
      setCategory: (categories) => set({ category: categories }),
      addCategory: (cat) => set({ category: [...get().category, cat] }),
      removeCategory: (cat) =>
        set({ category: get().category.filter((c) => c !== cat) }),
      setPriceRange: (range) => set({ priceRange: range }),
      setLocation: (loc) => set({ location: loc }),
      setCoordinates: (lat, lng) => set({ latitude: lat, longitude: lng }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setMaxDistance: (distance) => set({ maxDistance: distance }),
      reset: () => set({ ...defaultState }),
    }),
    { name: "search-params" }
  )
);
