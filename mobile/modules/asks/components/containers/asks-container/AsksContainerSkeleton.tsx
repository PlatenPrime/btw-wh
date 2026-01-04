import { View } from "react-native";
import { AsksListSkeleton } from "@/modules/asks/components/lists/asks-list/AsksListSkeleton";
import { ThemedBox } from "@/components/themed";

export function AsksContainerSkeleton() {
  return (
    <View className="flex-1 gap-4 p-4">
      <View className="gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 32, width: "100%" }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: 80 }} />
      </View>
      <AsksListSkeleton />
    </View>
  );
}

