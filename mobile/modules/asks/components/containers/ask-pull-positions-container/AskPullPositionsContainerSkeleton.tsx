import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { VStack } from "@/components/ui";
import { Box } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function AskPullPositionsContainerSkeleton() {
  const { card } = useThemeColors();

  return (
    <ThemedView
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <VStack className="gap-4">
        <Box className="rounded bg-secondary-300" style={{ height: 20, width: 160 }} />
        <VStack className="gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box
              key={index}
              className="rounded-lg border bg-secondary-300"
              style={{ height: 80, width: "100%" }}
            />
          ))}
        </VStack>
      </VStack>
    </ThemedView>
  );
}

