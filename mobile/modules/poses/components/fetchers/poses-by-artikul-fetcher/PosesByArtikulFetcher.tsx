import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { usePosesByArtikulQuery } from "@/modules/poses/api/hooks/queries/usePosesByArtikulQuery";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface PosesByArtikulFetcherProps {
  artikul: string;
  ContainerComponent: ComponentType<{ data: GetPosesByArtikulResponse }>;
  SkeletonComponent: ComponentType;
}

export function PosesByArtikulFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: PosesByArtikulFetcherProps) {
  const posesQuery = usePosesByArtikulQuery(artikul);

  if (posesQuery.isLoading || posesQuery.isFetching) {
    return <SkeletonComponent />;
  }

  if (posesQuery.error) {
    return (
      <ThemedView className="p-4 rounded-lg border border-outline-200">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Помилка завантаження позицій
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70">
          {posesQuery.error instanceof Error
            ? posesQuery.error.message
            : "Не вдалося завантажити позиції для цього артикулу"}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!posesQuery.data) {
    return (
      <ThemedView className="p-4 rounded-lg border border-outline-200">
        <ThemedText type="default" className="text-center">
          Позиції не знайдено
        </ThemedText>
      </ThemedView>
    );
  }

  // Дополнительная проверка структуры данных
  if (!posesQuery.data.pogrebi || !posesQuery.data.merezhi) {
    return (
      <ThemedView className="p-4 rounded-lg border border-outline-200">
        <ThemedText type="default" className="text-center text-xs opacity-70">
          Некоректна структура даних
        </ThemedText>
      </ThemedView>
    );
  }

  return <ContainerComponent data={posesQuery.data} />;
}

