import { ThemedBox } from "@/components/themed";

export function ZoneCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0 gap-2">
      <ThemedBox className="gap-2">
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 24, width: 96 }}
        />
        <ThemedBox className="gap-1">
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 120 }}
          />
          <ThemedBox
            className="rounded bg-secondary-300"
            style={{ height: 16, width: 80 }}
          />
        </ThemedBox>
      </ThemedBox>
    </ThemedBox>
  );
}

