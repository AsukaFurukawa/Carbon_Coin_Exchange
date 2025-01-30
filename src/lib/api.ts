import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    login: async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    },
    register: async (name: string, email: string, password: string) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    },
};

export const activities = {
    submit: async (activity: any) => {
        const { data } = await api.post('/activities', activity);
        return data;
    },
    getAll: async () => {
        const { data } = await api.get('/activities');
        return data;
    },
};

export default api; 