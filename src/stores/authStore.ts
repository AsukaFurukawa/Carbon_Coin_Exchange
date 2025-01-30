import create from 'zustand';
import { IUser } from '../types/auth';
import { auth } from '../lib/api';

interface AuthState {
    user: IUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { token, user } = await auth.login(email, password);
            localStorage.setItem('token', token);
            set({ user, token, isLoading: false });
        } catch (error) {
            set({ error: 'Invalid credentials', isLoading: false });
        }
    },
    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { token, user } = await auth.register(name, email, password);
            localStorage.setItem('token', token);
            set({ user, token, isLoading: false });
        } catch (error) {
            set({ error: 'Registration failed', isLoading: false });
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
})); 