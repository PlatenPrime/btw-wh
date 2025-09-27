import { calculateDefs } from "@/modules/defs/api/services/mutations/calculateDefs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCalculateDefsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => calculateDefs(),
    onMutate: () => {
      // Немедленно уведомляем о запуске процесса
      toast.info("Расчет дефицитов запущен", {
        description:
          "Процесс выполняется в фоне. Данные обновятся автоматически по завершении.",
        duration: 5000,
      });

      // Инвалидируем кеш сразу, чтобы начать обновление данных
      queryClient.invalidateQueries({ queryKey: ["defs", "latest"] });
    },
    onSuccess: () => {
      // Просто показываем, что запрос отправлен
      toast.success("Запрос на расчет отправлен", {
        description: "Расчет выполняется в фоне",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast.error("Ошибка при отправке запроса", {
        description: error?.message || "Не удалось запустить расчет",
      });
    },
  });
}
