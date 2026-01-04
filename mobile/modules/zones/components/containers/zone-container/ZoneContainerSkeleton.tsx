import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { Box } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function ZoneContainerSkeleton() {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

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
            <Box className="rounded bg-secondary-300" style={{ height: 24, width: 200 }} />
            <View className="gap-1 mt-2">
              <Box className="rounded bg-secondary-300" style={{ height: 16, width: 150 }} />
              <Box className="rounded bg-secondary-300" style={{ height: 16, width: 120 }} />
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

