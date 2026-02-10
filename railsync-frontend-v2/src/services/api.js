import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // ✅ CHANGE HERE

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ FULL WORD
  }

  return req;
});

export default API;
