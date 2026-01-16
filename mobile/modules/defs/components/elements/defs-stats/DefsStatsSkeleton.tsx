import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { View } from "react-native";

export function DefsStatsSkeleton() {
  return (
    <View className="flex-row gap-2">
      {[1, 2, 3].map((i) => (
        <ThemedView
          key={i}
          className="flex-1 p-2 rounded-lg border bg-background-0 border-outline-100"
        >
          <View className="flex-row justify-between">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 64, height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 32, height: 16 }}
            />
          </View>
        </ThemedView>
      ))}
    </View>
  );
}
