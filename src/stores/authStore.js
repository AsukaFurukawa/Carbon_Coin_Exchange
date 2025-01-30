import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: '1',
            name: 'Test User',
            email: email,
            carbonCoins: 100,
          };
          set({ user: mockUser, isAuthenticated: true });
          resolve(mockUser);
        }, 1000);
      });
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
    set({ user: null, isAuthenticated: false });
  },
})); 