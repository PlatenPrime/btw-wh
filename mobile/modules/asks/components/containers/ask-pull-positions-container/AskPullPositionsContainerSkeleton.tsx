import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedVStack, ThemedBox } from "@/components/themed";
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
      <ThemedVStack className="gap-4">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 20, width: 160 }} />
        <ThemedVStack className="gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <ThemedBox
              key={index}
              className="rounded-lg border bg-secondary-300"
              style={{ height: 80, width: "100%" }}
            />
          ))}
        </ThemedVStack>
      </ThemedVStack>
    </ThemedView>
  );
}

