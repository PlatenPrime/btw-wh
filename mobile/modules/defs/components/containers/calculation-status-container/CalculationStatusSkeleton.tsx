import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedSpinner, ThemedBox } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function CalculationStatusSkeleton() {
  const { card, theme } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ThemedView
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="flex-row items-center gap-2">
        <ThemedSpinner size="small" color={theme === "dark" ? "#60a5fa" : "#2563eb"} />
        <ThemedBox className="rounded bg-secondary-300" style={{ width: 200, height: 20 }} />
      </View>
      <ThemedBox className="mt-3 rounded bg-secondary-300" style={{ width: "100%", height: 80 }} />
    </ThemedView>
  );
}
