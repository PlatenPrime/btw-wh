import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const SERVER_URL = 'https://btw-wh.up.railway.app/api/';

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

// 🔐 Інтерцептор запиту — додаємо токен
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Інтерцептор відповіді — обробка помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('Неавторизовано. Спробуй увійти заново.');
        // TODO: Implement logout logic
      }

      if (status === 500) {
        console.error('Помилка сервера. Спробуй пізніше.');
      }
    }
    return Promise.reject(error);
  }
);
