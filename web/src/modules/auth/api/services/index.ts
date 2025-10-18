// Реэкспорт auth сервисов из shared для обратной совместимости
import { apiClient } from "@/lib/apiClient";
import {
  createGetMeService,
  createLoginService,
  createRegisterService,
  createUpdateUserService,
} from "@shared/modules/auth";

// Создаем экземпляры сервисов
const loginService = createLoginService(apiClient);
const registerService = createRegisterService(apiClient);
const getMeService = createGetMeService(apiClient);
const updateUserService = createUpdateUserService(apiClient);

// Экспортируем в старом формате для обратной совместимости
export const login = loginService;
export const register = registerService;
export const getMe = getMeService;
export const updateUser = updateUserService;
