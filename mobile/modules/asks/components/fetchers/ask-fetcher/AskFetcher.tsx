import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useAskQuery } from "@/modules/asks/api/hooks/queries/useAskQuery";
import type { AskDto } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";
import { Button, Text } from "@/components/ui";
import { TouchableOpacity } from "react-native";

interface AskFetcherProps {
  id: string;
  ContainerComponent: ComponentType<{
    askData: AskDto;
    refreshing?: boolean;
    onRefresh?: () => void;
  }>;
  SkeletonComponent: ComponentType;
}

export function AskFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: AskFetcherProps) {
  const askQuery = useAskQuery({ id });
  const askResponse = askQuery.data;

  if (askQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (askQuery.error) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center mb-4">
          Помилка завантаження запиту
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70 mb-4">
          Не вдалося завантажити запит
        </ThemedText>
        <Button onPress={() => askQuery.refetch()} variant="outline">
          <Text>Спробувати ще раз</Text>
        </Button>
      </ThemedView>
    );
  }

  if (!askResponse || !askResponse.exists) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center mb-4">
          Запит не знайдено
        </ThemedText>
        <ThemedText type="default" className="text-center text-xs opacity-70 mb-4">
          Запит з таким ID не існує або був видалений
        </ThemedText>
        <Button onPress={() => askQuery.refetch()} variant="outline">
          <Text>Спробувати ще раз</Text>
        </Button>
      </ThemedView>
    );
  }

  return (
    <ContainerComponent
      askData={askResponse.data!}
      refreshing={askQuery.isRefetching}
      onRefresh={() => void askQuery.refetch()}
    />
  );
}

