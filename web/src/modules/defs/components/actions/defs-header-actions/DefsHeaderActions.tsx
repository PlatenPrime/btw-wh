import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useCalculateDefsMutation } from "@/modules/defs/api/hooks/mutations/useCalculateDefsMutation";
import { getCalculationStatus } from "@/modules/defs/api/services/queries/getCalculationStatus";
import { DefsHeaderActionsView } from "@/modules/defs/components/actions/defs-header-actions/DefsHeaderActionsView";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calculator } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export function DefsHeaderActions() {
  const queryClient = useQueryClient();
  const calculateMutation = useCalculateDefsMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Считываем статус из кэша React Query (polling делает CalculationStatusFetcher).
  const statusQuery = useQuery({
    queryKey: ["defs", "calculation-status"],
    queryFn: getCalculationStatus,
    enabled: false,
  });

  const isCalculationRunning = statusQuery.data?.data?.isRunning ?? false;
  const isPending = calculateMutation.isPending;
  const isActionDisabled = isPending || isCalculationRunning;

  // Делаем onClick стабильным, но с актуальными флагами.
  const isCalculationRunningRef = useRef(isCalculationRunning);
  const isPendingRef = useRef(isPending);

  useEffect(() => {
    isCalculationRunningRef.current = isCalculationRunning;
  }, [isCalculationRunning]);

  useEffect(() => {
    isPendingRef.current = isPending;
  }, [isPending]);

  const openDialog = useCallback(() => {
    if (isPendingRef.current) {
      toast.info("Запит на розрахунок вже відправляється");
      return;
    }

    if (isCalculationRunningRef.current) {
      toast.info("Розрахунок дефіцитів вже виконується");
      return;
    }

    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const confirmCalculation = useCallback(() => {
    if (isPendingRef.current || isCalculationRunningRef.current) return;

    calculateMutation.mutate();
    setIsDialogOpen(false);
  }, [calculateMutation]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "calculate-defs",
        label: "Розрахувати дефіцити",
        icon: Calculator,
        iconColor: "sky",
        variant: "default",
        onClick: openDialog,
      },
    ],
    [openDialog],
  );

  useRegisterHeaderActions(headerActions);

  useEffect(() => {
    if (!calculateMutation.isSuccess) return;

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
  }, [calculateMutation.isSuccess, queryClient]);

  return (
    <DefsHeaderActionsView
      isDialogOpen={isDialogOpen}
      onClose={closeDialog}
      onConfirm={confirmCalculation}
      isPending={isPending}
      isDisabled={isActionDisabled}
    />
  );
}

