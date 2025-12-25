import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAskPullQuery } from "@/modules/asks/api/hooks/queries/useAskPullQuery";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";
import { Button, Text } from "@/components/ui";

interface AskPullPositionsFetcherProps {
  askId: string;
  ContainerComponent: ComponentType<{
    data: GetAskPullResponse;
    askId: string;
    isFetching: boolean;
  }>;
  SkeletonComponent: ComponentType;
}

export function AskPullPositionsFetcher({
  askId,
  ContainerComponent,
  SkeletonComponent,
}: AskPullPositionsFetcherProps) {
  const askPullQuery = useAskPullQuery({ id: askId });

  if (askPullQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (askPullQuery.error) {
    return (
      <ThemedView className="p-4">
        <ThemedText type="default" className="text-center mb-4">
          Помилка завантаження позицій для зняття
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70 mb-4">
          Не вдалося завантажити позиції для зняття
        </ThemedText>
        <Button onPress={() => askPullQuery.refetch()} variant="outline">
          <Text>Спробувати ще раз</Text>
        </Button>
      </ThemedView>
    );
  }

  if (!askPullQuery.data || !askPullQuery.data.exists || !askPullQuery.data.data) {
    return null; // Не показываем контейнер если ask не найден
  }

  // Всегда показываем контейнер, даже если снимать не нужно
  return (
    <ContainerComponent
      data={askPullQuery.data.data}
      askId={askId}
      isFetching={askPullQuery.isFetching}
    />
  );
}

