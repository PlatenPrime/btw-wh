import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedVStack, ThemedBox } from "@/components/themed";
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
      <ThemedVStack className="gap-3">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 128 }} />
        <ThemedVStack className="gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <ThemedBox
              key={index}
              className="rounded-md border bg-secondary-300"
              style={{ height: 56, width: "100%" }}
            />
          ))}
        </ThemedVStack>
      </ThemedVStack>
    </ThemedView>
  );
}

