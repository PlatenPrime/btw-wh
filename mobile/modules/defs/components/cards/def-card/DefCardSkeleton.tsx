import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { View } from "react-native";

export function DefCardSkeleton() {
  return (
    <ThemedView className="p-2 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
      <View className="gap-2">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-2">
            <ThemedBox
              className="rounded-lg bg-secondary-300"
              style={{ width: 64, height: 64 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 96, height: 16 }}
            />
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ width: 128, height: 12 }}
            />
          </View>
          <ThemedBox
            className="rounded-full bg-secondary-300"
            style={{ width: 8, height: 8 }}
          />
        </View>

        <View className="gap-2 px-2">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ width: "100%", height: 16 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ width: "100%", height: 16 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ width: "100%", height: 16 }}
          />
        </View>

        <ThemedBox
          className="rounded-md bg-secondary-300"
          style={{ width: "100%", height: 32 }}
        />
      </View>
    </ThemedView>
  );
}
