import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { DefsStatsSkeleton } from "@/modules/defs/components/elements/defs-stats/DefsStatsSkeleton";
import { DefsGridSkeleton } from "@/modules/defs/components/lists/defs-grid/DefsGridSkeleton";

export function DefsContainerSkeleton() {
  return (
    <View className="gap-2">
      <ThemedText type="default" className="text-center opacity-70 py-2">
        Триває розрахунок дефіцитів…
      </ThemedText>
      <DefsStatsSkeleton />
      <DefsGridSkeleton />
    </View>
  );
}
