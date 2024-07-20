import axios from "axios";

export const API_URL = "https://daem-backend.onrender.com/api";
export const SUPPORTED_LANGUAGES = ["en", "es"];

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
  },
});
