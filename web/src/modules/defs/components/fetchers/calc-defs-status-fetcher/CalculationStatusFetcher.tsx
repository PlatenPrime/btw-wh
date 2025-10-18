import { useDefsCalculationStatus } from "@/modules/defs/api/hooks/queries/useDefsCalculationStatus";
import type { DefsCalculationStatus } from "@/modules/defs/api/types";
import type { ComponentType } from "react";

interface CalculationStatusFetcherProps {
  enabled: boolean;
  onStatusChange?: (isRunning: boolean) => void;
  ContainerComponent: ComponentType<{
    status: DefsCalculationStatus;
    isLoading: boolean;
  }>;
  SkeletonComponent: ComponentType;
}

export function CalculationStatusFetcher({
  enabled,
  onStatusChange,
  ContainerComponent,
  SkeletonComponent,
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
    return <SkeletonComponent />;
  }

  // Показываем данные если есть
  if (data?.data) {
    return <ContainerComponent status={data.data} isLoading={false} />;
  }

  // Не показываем ничего, если нет данных
  return null;
}
