import axios from 'axios';
import { ACCESS_TOKEN, ENDPOINTS } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

// export const fetchCategories =async () => {
//     try {
//         const response = await api.get(ENDPOINTS.GET_CATEGORIES);
//         return response.data;
//     } catch ()
// }