import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { View } from "react-native";

export function AskDetailsCardSkeleton() {
  return (
    <ThemedView className="p-3 rounded-lg border border-outline-50 bg-background-0">
      <View className="gap-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 flex-row items-start gap-3">
            <ThemedBox
              className="rounded-lg bg-secondary-300"
              style={{ height: 60, width: 60 }}
            />
            <View className="flex-1 gap-2">
              <ThemedBox
                className="rounded bg-secondary-300"
                style={{ height: 16, width: 128 }}
              />
              <ThemedBox
                className="rounded bg-secondary-300"
                style={{ height: 12, width: 192 }}
              />
            </View>
          </View>
          <ThemedBox
            className="rounded-md bg-secondary-300"
            style={{ height: 24, width: 80 }}
          />
        </View>

        <View className="gap-2">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 64 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 128 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 96 }}
          />
          <BtradeArtDataSkeleton />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 112 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 12, width: 80 }}
          />
        </View>
      </View>
    </ThemedView>
  );
}
