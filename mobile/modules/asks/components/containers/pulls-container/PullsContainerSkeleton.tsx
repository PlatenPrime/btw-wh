import { ThemedBox } from "@/components/themed";
import { View } from "react-native";

function PullsPositionCardSkeleton() {
  return (
    <View className="gap-2 rounded-lg p-2">
      <View className="flex-row items-center justify-between gap-2">
        <ThemedBox
          className="flex-1 rounded bg-secondary-300"
          style={{ height: 20 }}
        />
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 34, width: 100 }}
        />
      </View>
      <ThemedBox
        className="rounded-lg bg-secondary-300"
        style={{ height: 84, width: "100%" }}
      />
      <ThemedBox
        className="rounded bg-secondary-300"
        style={{ height: 14, width: "40%" }}
      />
    </View>
  );
}

export function PullsContainerSkeleton() {
  return (
    <View className="flex-1 gap-4 p-4">
      <View className="gap-2">
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 32, width: "60%" }}
        />
      </View>
      <View className="gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <PullsPositionCardSkeleton key={index} />
        ))}
      </View>
    </View>
  );
}
