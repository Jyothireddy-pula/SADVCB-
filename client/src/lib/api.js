import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  // Prefer explicit env URL; fallback to same-origin `/api` so Vite proxy works.
  baseURL: configuredBaseUrl || '/api',
  timeout: 15000
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      error.message = 'Network Error: API server is unreachable. Start backend and verify VITE_API_URL/proxy.';
    }
    throw error;
  }
);

export default api;
