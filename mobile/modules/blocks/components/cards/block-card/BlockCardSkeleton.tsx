import { ThemedBox } from "@/components/themed";

export function BlockCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2">
      <ThemedBox className="gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 24, width: "75%" }} />
        <ThemedBox className="gap-1">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: "100%" }} />
        </ThemedBox>
      </ThemedBox>
    </ThemedBox>
  );
}

