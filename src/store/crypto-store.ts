"use client";

import { create } from "zustand";
import type { Coin } from "@/interfaces";

interface CryptoStore {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  viewMode: "table" | "cards";

  setCoins: (coins: Coin[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setViewMode: (mode: "table" | "cards") => void;
  fetchCoins: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
  coins: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 10, // Assuming 10 pages for 1000 coins total
  searchTerm: "",
  viewMode: "table",

  setCoins: (coins) => set({ coins }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (currentPage) => {
    set({ currentPage });
    // Automatically fetch coins when page changes
    get().fetchCoins();
  },
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setViewMode: (viewMode) => set({ viewMode }),

  fetchCoins: async () => {
    const { currentPage } = get();
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`
      );

      if (!response.ok) {
        throw new Error("Error al obtener datos de la API");
      }

      const data = await response.json();
      set({ coins: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        loading: false,
      });
    }
  },

  refreshData: async () => {
    await get().fetchCoins();
  },
}));
