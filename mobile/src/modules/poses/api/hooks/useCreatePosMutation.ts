import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPos } from '../services/createPos';
import type { CreatePosDto, PosResponse } from '../types';

export const useCreatePosMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PosResponse, Error, CreatePosDto>({
    mutationFn: createPos,
    onSuccess: () => {
      // Инвалидируем кеш позиций для обновления списка
      queryClient.invalidateQueries({ queryKey: ['poses'] });
    },
  });
};
