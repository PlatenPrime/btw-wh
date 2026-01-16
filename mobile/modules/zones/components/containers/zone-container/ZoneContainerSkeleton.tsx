import { ThemedBox } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import { View } from "react-native";

export function ZoneContainerSkeleton() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const bgColor = SemanticColors.card.bg[theme];
  const borderColor = SemanticColors.card.border[theme];

  return (
    <ThemedView className="flex-1">
      <View className="p-4">
        <View
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <View className="gap-2">
            <ThemedBox
              className="rounded bg-secondary-300"
              style={{ height: 24, width: 200 }}
            />
            <View className="gap-1 mt-2">
              <ThemedBox
                className="rounded bg-secondary-300"
                style={{ height: 16, width: 150 }}
              />
              <ThemedBox
                className="rounded bg-secondary-300"
                style={{ height: 16, width: 120 }}
              />
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
