import { useDefsCalculationStatus } from "@/modules/defs/api/hooks/queries/useDefsCalculationStatus";
import { CalculationStatus } from "@/modules/defs/components/status/calculation-status/CalculationStatus";

interface CalculationStatusFetcherProps {
  enabled: boolean;
  onStatusChange?: (isRunning: boolean) => void;
}

export function CalculationStatusFetcher({
  enabled,
  onStatusChange,
}: CalculationStatusFetcherProps) {
  const { data, isLoading, error } = useDefsCalculationStatus({
    enabled,
    onStatusChange: (status) => {
      onStatusChange?.(status?.data?.isRunning ?? false);
    },
  });

  if (error) {
    return null; // Скрываем ошибки, чтобы не мешать основному UI
  }

  // Не показываем ничего, если не enabled
  if (!enabled) {
    return null;
  }

  // Показываем состояние загрузки
  if (isLoading) {
    return <CalculationStatus status={{ isRunning: true }} isLoading={true} />;
  }

  // Показываем данные если есть
  if (data?.data) {
    return <CalculationStatus status={data.data} isLoading={false} />;
  }

  // Не показываем ничего, если нет данных
  return null;
}
