import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { VStack } from "@/components/ui";
import { Box } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";

export function AskEventsSkeleton() {
  const { card } = useThemeColors();

  return (
    <ThemedView
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <VStack className="gap-3">
        <Box className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
        <VStack className="gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              className="rounded-md border bg-secondary-300"
              style={{ height: 56, width: "100%" }}
            />
          ))}
        </VStack>
      </VStack>
    </ThemedView>
  );
}

