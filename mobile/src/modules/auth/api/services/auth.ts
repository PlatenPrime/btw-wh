import { apiClient } from '../../../../lib/apiClient';
import type { RegisterData, UpdateUserData, User } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/auth/register', data);
  return res.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await apiClient.get<User>('/auth/me');
  return res.data;
};

export const updateUser = async (data: UpdateUserData): Promise<User> => {
  const res = await apiClient.patch<User>('/auth/me', data);
  return res.data;
};
