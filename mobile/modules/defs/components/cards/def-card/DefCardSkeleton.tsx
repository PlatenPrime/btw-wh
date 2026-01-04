import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedBox } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function DefCardSkeleton() {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ThemedView
      className="p-2 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="gap-2">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-2">
            <ThemedBox className="rounded-lg bg-secondary-300" style={{ width: 64, height: 64 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ width: 96, height: 16 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ width: 128, height: 12 }} />
          </View>
          <ThemedBox className="rounded-full bg-secondary-300" style={{ width: 8, height: 8 }} />
        </View>

        <View className="gap-2 px-2">
          <ThemedBox className="rounded bg-secondary-300" style={{ width: "100%", height: 16 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ width: "100%", height: 16 }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ width: "100%", height: 16 }} />
        </View>

        <ThemedBox className="rounded-md bg-secondary-300" style={{ width: "100%", height: 32 }} />
      </View>
    </ThemedView>
  );
}