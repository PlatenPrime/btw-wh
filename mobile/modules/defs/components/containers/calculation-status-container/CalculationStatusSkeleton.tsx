import { ThemedBox, ThemedSpinner } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { SemanticColors } from "@/constants/theme";
import { View } from "react-native";

export function CalculationStatusSkeleton() {
  return (
    <ThemedView className="p-4 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
      <View className="flex-row items-center gap-2">
        <ThemedSpinner size="small" color={SemanticColors.info} />
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
