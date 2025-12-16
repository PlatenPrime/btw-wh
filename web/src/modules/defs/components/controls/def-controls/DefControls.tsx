import { useCalculateDefsMutation } from "@/modules/defs/api/hooks/mutations/useCalculateDefsMutation";
import { useDefsCalculationStatus } from "@/modules/defs/api/hooks/queries/useDefsCalculationStatus";
import { DefControlsView } from "@/modules/defs/components/controls/def-controls/DefControlsView";
import { CalculationConfirmationDialog } from "@/modules/defs/components/dialogs/calculation-confirmation-dialog/CalculationConfirmationDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function DefControls() {
  const calculateMutation = useCalculateDefsMutation();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Получаем статус расчета
  const statusQuery = useDefsCalculationStatus({
    enabled: true,
  });
  const statusData = statusQuery.data;

  const handleCalculateClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmCalculation = () => {
    calculateMutation.mutate();
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (calculateMutation.isSuccess) {
      // Ждем 2 секунды, чтобы сервер успел запустить процесс
      const timeoutId = setTimeout(() => {
        // Принудительно обновляем статус расчета после успешного запуска
        queryClient.invalidateQueries({
          queryKey: ["defs", "calculation-status"],
        });
        // Принудительно запускаем refetch
        queryClient.refetchQueries({
          queryKey: ["defs", "calculation-status"],
        });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [calculateMutation.isSuccess, queryClient]);

  // Определяем состояние кнопки на основе реального статуса расчета
  const isCalculationRunning = statusData?.data?.isRunning ?? false;
  const isRecentlyStarted = isCalculationRunning;

  return (
    <>
      <DefControlsView
        handleCalculate={handleCalculateClick}
        isPending={calculateMutation.isPending}
        isRecentlyStarted={isRecentlyStarted}
      />

      <CalculationConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCalculation}
        isPending={calculateMutation.isPending}
      />
    </>
  );
}
