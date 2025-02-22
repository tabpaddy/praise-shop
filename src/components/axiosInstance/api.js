import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',    // Add this
  xsrfHeaderName: 'X-XSRF-TOKEN',  // Add this
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;