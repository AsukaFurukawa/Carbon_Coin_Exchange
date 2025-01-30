import { create } from 'zustand';

export const useHeaderStore = create((set) => ({
  coins: 0,
  updateCoins: (newCoins) => set({ coins: newCoins }),
})); 