import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, updateUser } from '../services/auth';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Инвалидируем кеш пользователя
      queryClient.setQueryData(['auth', 'user'], data.user);
      queryClient.setQueryData(['auth', 'token'], data.token);
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      // Инвалидируем кеш пользователя
      queryClient.setQueryData(['auth', 'user'], data.user);
      queryClient.setQueryData(['auth', 'token'], data.token);
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      // Обновляем кеш пользователя
      queryClient.setQueryData(['auth', 'user'], user);
    },
  });
};
