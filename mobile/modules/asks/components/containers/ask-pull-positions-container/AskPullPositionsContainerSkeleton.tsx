import { ThemedBox, ThemedVStack } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";

export function AskPullPositionsContainerSkeleton() {
  return (
    <ThemedView className="p-4 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
      <ThemedVStack className="gap-4">
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 20, width: 160 }}
        />
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
