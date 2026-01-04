import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Box } from "@/components/ui";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function AskDetailsCardSkeleton() {
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
      <View className="gap-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 flex-row items-start gap-3">
            <Box className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
            <View className="flex-1 gap-2">
              <Box className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
              <Box className="rounded bg-secondary-300" style={{ height: 12, width: 192 }} />
            </View>
          </View>
          <Box className="rounded-md bg-secondary-300" style={{ height: 24, width: 80 }} />
        </View>

        <View className="gap-2">
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 64 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 96 }} />
          <BtradeArtDataSkeleton />
          <Box className="rounded bg-secondary-300" style={{ height: 16, width: 112 }} />
          <Box className="rounded bg-secondary-300" style={{ height: 12, width: 80 }} />
        </View>
      </View>
    </ThemedView>
  );
}

