import { calculateDefs } from "@/modules/defs/api/services/mutations/calculateDefs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCalculateDefsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => calculateDefs(),
    onMutate: () => {
      // Немедленно уведомляем о запуске процесса
      toast.info("Розрахунок дефіцитів запущено", {
        description:
          "Процес виконується в фоновому режимі. Дані оновляться автоматично після завершення.",
        duration: 5000,
      });

      // Инвалидируем кеш сразу, чтобы начать обновление данных
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
    onSuccess: () => {
      // Просто показываем, что запрос отправлен
      toast.success("Запит на розрахунок відправлено", {
        description: "Розрахунок виконується в фоновому режимі",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast.error("Помилка при відправці запиту", {
        description: error?.message || "Не вдалося запустити розрахунок",
      });
    },
  });
}
