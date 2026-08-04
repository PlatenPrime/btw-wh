import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { useLatestDefsQuery } from "@/modules/defs/api/hooks/queries/useLatestDefsQuery";
import { DefsContainer } from "@/modules/defs/components/containers/defs-container/DefsContainer";
import { DefsContainerSkeleton } from "@/modules/defs/components/containers/defs-container/DefsContainerSkeleton";

export function LatestDefsFetcher() {
  const defsQuery = useLatestDefsQuery();

  if (defsQuery.isLoading) {
    return <DefsContainerSkeleton />;
  }

  if (defsQuery.error) {
    return (
      <View className="flex-1 justify-center items-center p-4 gap-2">
        <ThemedText type="default" className="text-center">
          Помилка завантаження дефіцитів
        </ThemedText>
        <ThemedText type="default" className="text-center opacity-70">
          Спробуйте оновити екран
        </ThemedText>
      </View>
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
      </View>
    );
  }

  return <DefsContainer defsData={defsQuery.data.data} />;
}
