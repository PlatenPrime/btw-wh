import { ThemedBox, ThemedSpinner } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { useTheme } from "@/providers/theme-provider";
import { View } from "react-native";

export function CalculationStatusSkeleton() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ThemedView className="p-4 rounded-lg border bg-background-0 border-outline-100">
      <View className="flex-row items-center gap-2">
        <ThemedSpinner
          size="small"
          color={theme === "dark" ? "#60a5fa" : "#2563eb"}
        />
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ width: 200, height: 20 }}
        />
      </View>
      <ThemedBox
        className="mt-3 rounded bg-secondary-300"
        style={{ width: "100%", height: 80 }}
      />
    </ThemedView>
  );
}
