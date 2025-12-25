import { useState } from "react";
import { useAsksByDateQuery } from "@/modules/asks/api/hooks/queries/useAsksByDateQuery";
import { AsksContainer } from "@/modules/asks/components/containers/asks-container/AsksContainer";
import { AsksContainerSkeleton } from "@/modules/asks/components/containers/asks-container/AsksContainerSkeleton";
import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { formatDateForAPI } from "@/modules/asks/utils/format-date";

interface AsksFetcherProps {
  initialDate?: Date;
}

export function AsksFetcher({ initialDate = new Date() }: AsksFetcherProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const dateString = formatDateForAPI(selectedDate);

  const asksQuery = useAsksByDateQuery({
    date: dateString,
  });

  if (asksQuery.isLoading) {
    return <AsksContainerSkeleton />;
  }

  if (asksQuery.error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Помилка завантаження запитів
        </ThemedText>
      </View>
    );
  }

  if (!asksQuery.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <AsksContainer
      data={asksQuery.data}
      isFetching={asksQuery.isFetching}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      refreshing={asksQuery.isRefetching}
      onRefresh={() => void asksQuery.refetch()}
    />
  );
}

