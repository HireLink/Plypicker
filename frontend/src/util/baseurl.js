import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: 'https://plypicker-mauve.vercel.app',
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Send a request to the new token refresh endpoint
        const response = await axiosInstance.post('/api/refreshtoken', {
          expiredToken: localStorage.getItem('token'),
          email: localStorage.getItem("userEmail")
        });

        localStorage.setItem('token', response.data.token);

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // Redirect to the login page or perform other necessary actions
        // Handle refresh error appropriately
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
