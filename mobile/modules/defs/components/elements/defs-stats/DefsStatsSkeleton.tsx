import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedBox } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function DefsStatsSkeleton() {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <View className="flex-row gap-2">
      {[1, 2, 3].map((i) => (
        <ThemedView
          key={i}
          className="flex-1 p-2 rounded-lg border"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <View className="flex-row justify-between">
            <ThemedBox className="rounded bg-secondary-300" style={{ width: 64, height: 16 }} />
            <ThemedBox className="rounded bg-secondary-300" style={{ width: 32, height: 16 }} />
          </View>
        </ThemedView>
      ))}
    </View>
  );
}
