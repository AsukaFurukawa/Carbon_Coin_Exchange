import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const mockUser = { id: 1, email, name: 'Test User', carbonCoins: 100 };
      set({ user: mockUser, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const mockUser = { id: 1, email, name, carbonCoins: 0 };
      set({ user: mockUser, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null });
  },
})); 