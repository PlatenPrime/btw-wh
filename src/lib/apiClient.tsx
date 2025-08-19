import { SERVER_URL } from "@/constants/server";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

// // 🔐 Інтерцептор запиту — додамо токен (якщо з'явиться)
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ⚠️ Інтерцептор відповіді — обробка помилок
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         console.warn("Неавторизовано. Спробуй увійти заново.");
//         // Можеш тут робити logout, redirect і т.п.
//       }

//       if (status === 500) {
//         console.error("Помилка сервера. Спробуй пізніше.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );
