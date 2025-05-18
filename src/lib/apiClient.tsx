import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "https://btw-wh.up.railway.app/api",
  timeout: 10000,
});


// // 🔐 Интерцептор запроса — добавим токен (если появится)
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

// // ⚠️ Интерцептор ответа — обработка ошибок
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         console.warn("Неавторизован. Попробуй войти заново.");
//         // Можешь тут делать logout, redirect и т.п.
//       }

//       if (status === 500) {
//         console.error("Ошибка сервера. Попробуй позже.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );