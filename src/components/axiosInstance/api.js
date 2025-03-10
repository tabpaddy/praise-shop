import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',    // Add this
  xsrfHeaderName: 'X-XSRF-TOKEN',  // Add this
  headers: {
    "Content-Type": "application/json",
    'Accept': "application/json",
  },
});

export default api;