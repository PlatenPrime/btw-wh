import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";

export function BtradeArtDataSkeleton() {
  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2">
        <ThemedView className="h-4 w-4 rounded" />
        <ThemedView className="h-4 w-12 rounded" />
      </View>
      <View className="flex-row items-center gap-2">
        <ThemedView className="h-4 w-4 rounded" />
        <ThemedView className="h-4 w-12 rounded" />
      </View>
    </View>
  );
}

