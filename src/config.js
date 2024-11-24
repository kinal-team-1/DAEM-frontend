import axios from "axios";

export const API_URL = "http://localhost:3000/api";
export const SUPPORTED_LANGUAGES = ["en", "es"];

export const EMAILJS_PUBLIC_KEY = "OV924hAIzB0XqlqCv";

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    "Accept-Language": localStorage.getItem("locale") || "en",
  },
});
