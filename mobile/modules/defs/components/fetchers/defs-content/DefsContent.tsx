import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedButton } from "@/components/themed/themed-button";
import { useLatestDefsQuery } from "@/modules/defs/api/hooks/queries/useLatestDefsQuery";
import { DefsContainer } from "@/modules/defs/components/containers/defs-container/DefsContainer";
import { DefsContainerSkeleton } from "@/modules/defs/components/containers/defs-container/DefsContainerSkeleton";

export function DefsContent() {
  const defsQuery = useLatestDefsQuery();

  if (defsQuery.error) {
    return (
      <View className="flex-1 justify-center items-center p-4 gap-2">
        <ThemedText type="default" className="text-center">
          Помилка завантаження дефіцитів
        </ThemedText>
        <ThemedText type="default" className="text-center opacity-70">
          {defsQuery.error instanceof Error
            ? defsQuery.error.message
            : "Спробуйте оновити екран"}
        </ThemedText>
        <ThemedButton
          variant="default"
          onPress={() => void defsQuery.refetch()}
          className="mt-2 px-4"
        >
          <ThemedText type="default" className="text-typography-0">
            Повторити
          </ThemedText>
        </ThemedButton>
      </View>
    );
  }

  if (defsQuery.isLoading) {
    return (
      <ScrollView className="flex-1" contentContainerClassName="gap-2 p-2">
        <DefsContainerSkeleton />
      </ScrollView>
    );
  }

  if (!defsQuery.data?.data) {
    return (
      <View className="flex-1 justify-center items-center p-4 gap-2">
        <ThemedText type="default" className="text-center">
          Помилка завантаження дефіцитів
        </ThemedText>
        <ThemedText type="default" className="text-center opacity-70">
          Не вдалося отримати результат розрахунку. Спробуйте ще раз.
        </ThemedText>
        <ThemedButton
          variant="default"
          onPress={() => void defsQuery.refetch()}
          className="mt-2 px-4"
        >
          <ThemedText type="default" className="text-typography-0">
            Повторити
          </ThemedText>
        </ThemedButton>
      </View>
    );
  }

  return (
    <DefsContainer
      defsData={defsQuery.data.data}
      refreshing={defsQuery.isRefetching}
      onRefresh={() => void defsQuery.refetch()}
    />
  );
}
