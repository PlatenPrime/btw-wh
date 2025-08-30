import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePos } from '../services/deletePos';

export const useDeletePosMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deletePos,
    onSuccess: () => {
      // Инвалидируем кеш позиций для обновления списка
      queryClient.invalidateQueries({ queryKey: ['poses'] });
    },
  });
};
