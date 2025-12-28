import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { Spinner } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Box } from "@/components/ui";

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
        <Spinner size="small" color={theme === "dark" ? "#60a5fa" : "#2563eb"} />
        <Box className="rounded bg-secondary-300" style={{ width: 200, height: 20 }} />
      </View>
      <Box className="mt-3 rounded bg-secondary-300" style={{ width: "100%", height: 80 }} />
    </ThemedView>
  );
}
