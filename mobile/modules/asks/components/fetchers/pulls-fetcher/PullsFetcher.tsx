import { useAsksPullsQuery } from "@/modules/asks/api/hooks/queries/useAsksPullsQuery";
import { PullsContainer } from "@/modules/asks/components/containers/pulls-container/PullsContainer";
import { PullsContainerSkeleton } from "@/modules/asks/components/containers/pulls-container/PullsContainerSkeleton";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";

export function PullsFetcher() {
  const pullsQuery = useAsksPullsQuery();

  if (pullsQuery.isLoading) {
    return <PullsContainerSkeleton />;
  }

  if (pullsQuery.error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Помилка завантаження позицій для зняття
        </ThemedText>
      </View>
    );
  }

  if (!pullsQuery.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <PullsContainer
      data={pullsQuery.data.data}
      isFetching={pullsQuery.isFetching}
      refreshing={pullsQuery.isRefetching}
      onRefresh={() => void pullsQuery.refetch()}
    />
  );
}

