import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { ThemedBox } from "@/components/themed";

export function AsksListCardSkeleton() {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ThemedView
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="gap-2">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 flex-row items-start gap-3">
            <ThemedBox className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
            <View className="flex-1 gap-2">
              <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
              <ThemedBox className="rounded bg-secondary-300" style={{ height: 12, width: 192 }} />
            </View>
          </View>
          <ThemedBox className="rounded-md bg-secondary-300" style={{ height: 24, width: 80 }} />
        </View>

        <View className="gap-2">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 64 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 96 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 12, width: 80 }} />
        </View>
      </View>
    </ThemedView>
  );
}

