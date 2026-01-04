import { useEffect, useCallback } from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { useLatestDefsQuery } from "@/modules/defs/api/hooks/queries/useLatestDefsQuery";
import { useDefsCalculationStatus } from "@/modules/defs/api/hooks/queries/useDefsCalculationStatus";
import { DefsContainer } from "@/modules/defs/components/containers/defs-container/DefsContainer";
import { DefsContainerSkeleton } from "@/modules/defs/components/containers/defs-container/DefsContainerSkeleton";
import { CalculationStatusContainer } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusContainer";
import { CalculationStatusSkeleton } from "@/modules/defs/components/containers/calculation-status-container/CalculationStatusSkeleton";

interface DefsContentProps {
  onStatusChange?: (isRunning: boolean) => void;
  onRefreshingChange?: (refreshing: boolean, onRefresh: () => Promise<void>) => void;
}

export function DefsContent({
  onStatusChange,
  onRefreshingChange,
}: DefsContentProps) {
  const defsQuery = useLatestDefsQuery();
  const statusQuery = useDefsCalculationStatus({
    enabled: true,
    onStatusChange: (status) => {
      onStatusChange?.(status?.data?.isRunning ?? false);
    },
  });

  // Объединяем isRefetching от обоих запросов
  const refreshing = defsQuery.isRefetching || statusQuery.isRefetching;

  // Создаем общий onRefresh, который обновляет оба запроса параллельно
  const handleRefresh = useCallback(async () => {
    await Promise.all([
      defsQuery.refetch(),
      statusQuery.refetch(),
    ]);
  }, [defsQuery.refetch, statusQuery.refetch]);

  // Передаем refreshing и onRefresh в родительский компонент при изменении
  useEffect(() => {
    onRefreshingChange?.(refreshing, handleRefresh);
  }, [refreshing, handleRefresh, onRefreshingChange]);

  // Обработка ошибок для defsQuery
  if (defsQuery.error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Помилка завантаження дефіцитів
        </ThemedText>
      </View>
    );
  }

  // Показываем состояние загрузки для defsQuery
  if (defsQuery.isLoading) {
    return <DefsContainerSkeleton />;
  }

  // Проверяем наличие данных
  if (!defsQuery.data?.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Немає даних про дефіцити
        </ThemedText>
      </View>
    );
  }

  return (
    <>
      {/* Статус расчета */}
      {statusQuery.isLoading ? (
        <CalculationStatusSkeleton />
      ) : statusQuery.data?.data ? (
        <CalculationStatusContainer
          status={statusQuery.data.data}
          isLoading={false}
        />
      ) : null}

      {/* Дефициты */}
      <DefsContainer
        defsData={defsQuery.data.data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
}

