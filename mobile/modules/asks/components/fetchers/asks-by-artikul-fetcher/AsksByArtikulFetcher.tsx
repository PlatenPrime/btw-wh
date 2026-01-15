import { ThemedView } from "@/components/themed/themed-view";
import { ThemedText } from "@/components/themed/themed-text";
import { useAsksByArtikulQuery } from "@/modules/asks/api/hooks/queries/useAsksByArtikulQuery";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AsksByArtikulFetcherProps {
  artikul: string;
  ContainerComponent: ComponentType<{ data: GetAsksByArtikulResponse }>;
  SkeletonComponent: ComponentType;
}

export function AsksByArtikulFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: AsksByArtikulFetcherProps) {
  const asksQuery = useAsksByArtikulQuery({
    artikul,
  });

  if (asksQuery.isLoading || asksQuery.isFetching) {
    return <SkeletonComponent />;
  }

  if (asksQuery.error) {
    return (
      <ThemedView className="p-4 rounded-lg border border-outline-50">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Помилка завантаження запитів
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70">
          {asksQuery.error instanceof Error
            ? asksQuery.error.message
            : "Не вдалося завантажити запити для обраного артикулу"}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!asksQuery.data) {
    return (
      <ThemedView className="p-4 rounded-lg border border-outline-50">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </ThemedView>
    );
  }

  return <ContainerComponent data={asksQuery.data} />;
}
