import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post('http://localhost:8000/api/refresh', {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    return response.data;
  },

  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/refresh', { refresh: refreshToken });
    return response.data;
  },

  googleLogin: async (code: string) => {
    const response = await api.post('/v1/auth/google', { code });
    return response.data;
  },
};

// Chat API calls
export const chatAPI = {
  sendMessage: async (message: string) => {
    const response = await api.post('/chat', { message });
    return response.data;
  },
  
  getChatHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },
};

// Jobs API calls
export const jobsAPI = {
  searchJobs: async (jobTitle: string, location: string = 'India') => {
    const response = await api.post('/jobs/search', {
      job_title: jobTitle,
      location,
    });
    return response.data;
  },
};

export default api;
