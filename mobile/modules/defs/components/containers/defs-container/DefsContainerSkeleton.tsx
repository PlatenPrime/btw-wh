import { View } from "react-native";
import { DefsStatsSkeleton } from "@/modules/defs/components/elements/defs-stats/DefsStatsSkeleton";
import { DefsGridSkeleton } from "@/modules/defs/components/lists/defs-grid/DefsGridSkeleton";

export function DefsContainerSkeleton() {
  return (
    <View className="gap-2">
      <DefsStatsSkeleton />
      <DefsGridSkeleton />
    </View>
  );
}
