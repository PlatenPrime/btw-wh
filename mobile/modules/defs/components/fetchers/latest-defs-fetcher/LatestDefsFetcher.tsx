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
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Помилка завантаження дефіцитів
        </ThemedText>
      </View>
    );
  }

  if (!defsQuery.data?.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="default" className="text-center">
          Немає даних про дефіцити
        </ThemedText>
      </View>
    );
  }

  return <DefsContainer defsData={defsQuery.data.data} />;
}
