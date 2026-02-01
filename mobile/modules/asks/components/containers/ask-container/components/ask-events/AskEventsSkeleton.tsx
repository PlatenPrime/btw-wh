import { ThemedBox, ThemedVStack } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";

export function AskEventsSkeleton() {
  return (
    <ThemedView className="p-3 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
      <ThemedVStack className="gap-3">
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 16, width: 128 }}
        />
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
