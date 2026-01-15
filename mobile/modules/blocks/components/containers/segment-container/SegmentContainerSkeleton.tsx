import { ThemedBox, ThemedVStack } from "@/components/themed";

export function SegmentContainerSkeleton() {
  return (
    <ThemedVStack className="gap-4 p-2">
      <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
        <ThemedVStack className="gap-2">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
        </ThemedVStack>
      </ThemedBox>
      <ThemedVStack className="gap-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <ThemedBox key={i} className="rounded bg-secondary-300" style={{ height: 128, width: "100%" }} />
        ))}
      </ThemedVStack>
    </ThemedVStack>
  );
}

