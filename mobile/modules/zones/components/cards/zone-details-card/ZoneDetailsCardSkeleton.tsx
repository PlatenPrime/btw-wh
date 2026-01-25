import { ThemedBox } from "@/components/themed";
import { View } from "react-native";

export function ZoneDetailsCardSkeleton() {
  return (
    <View className="p-4 rounded-lg border border-outline-50 bg-background-0">
      <ThemedBox className="gap-2">
        <ThemedBox className="gap-1">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 140 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 110 }}
          />
        </ThemedBox>
      </ThemedBox>
    </View>
  );
}

