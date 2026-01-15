import { ThemedBox, ThemedVStack } from "@/components/themed";

export function ZoneBySegmentCardSkeleton() {
  return (
    <ThemedVStack className="gap-2">
      <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0">
        <ThemedBox className="gap-2">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
          <ThemedBox className="gap-1">
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
            <ThemedBox className="h-px bg-outline-200 my-1" />
            <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          </ThemedBox>
        </ThemedBox>
      </ThemedBox>
      <ThemedBox className="pl-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 96, width: "100%" }} />
      </ThemedBox>
    </ThemedVStack>
  );
}

