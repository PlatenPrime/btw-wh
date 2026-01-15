import { ThemedBox } from "@/components/themed";

export function ArtGridCardSkeleton() {
  return (
    <ThemedBox className="flex-row items-center p-3 rounded-lg border border-outline-50 bg-background-0">
      <ThemedBox className="rounded-lg bg-secondary-300" style={{ height: 60, width: 60 }} />
      <ThemedBox className="ml-3 flex-1 gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 120 }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 14, width: '100%' }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 14, width: '80%' }} />
      </ThemedBox>
    </ThemedBox>
  );
}
