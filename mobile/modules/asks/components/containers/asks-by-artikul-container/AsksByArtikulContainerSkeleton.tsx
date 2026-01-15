import { ThemedVStack, ThemedBox } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";

export function AsksByArtikulContainerSkeleton() {
  return (
    <ThemedVStack className="gap-4">
      <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: 100, alignSelf: "center" }} />
      <ThemedVStack className="gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <ThemedBox
            key={index}
            className="rounded-lg border bg-secondary-300"
            style={{ height: 100, width: "100%" }}
          />
        ))}
      </ThemedVStack>
    </ThemedVStack>
  );
}
