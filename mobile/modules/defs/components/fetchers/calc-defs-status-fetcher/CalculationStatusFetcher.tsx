import { useDefsCalculationStatus } from "@/modules/defs/api/hooks/queries/useDefsCalculationStatus";
import { CalculationStatusContainer } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusContainer";
import { CalculationStatusSkeleton } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusSkeleton";

interface CalculationStatusFetcherProps {
  enabled: boolean;
  onStatusChange?: (isRunning: boolean) => void;
}

export function CalculationStatusFetcher({
  enabled,
  onStatusChange,
}: CalculationStatusFetcherProps) {
  const statusQuery = useDefsCalculationStatus({
    enabled,
    onStatusChange: (status) => {
      onStatusChange?.(status?.data?.isRunning ?? false);
    },
  });

  if (statusQuery.error) {
    return null; // Скрываем ошибки, чтобы не мешать основному UI
  }

  // Не показываем ничего, если не enabled
  if (!enabled) {
    return null;
  }

  // Показываем состояние загрузки
  if (statusQuery.isLoading) {
    return <CalculationStatusSkeleton />;
  }

  // Показываем данные если есть
  if (statusQuery.data?.data) {
    return (
      <CalculationStatusContainer
        status={statusQuery.data.data}
        isLoading={false}
      />
    );
  }

  // Не показываем ничего, если нет данных
  return null;
}
