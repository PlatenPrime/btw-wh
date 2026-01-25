import { ThemedBox } from "@/components/themed";

export function PalletCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-50 bg-background-0 gap-2">
      <ThemedBox className="flex-row items-center justify-between">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 20, width: 96 }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 64 }} />
      </ThemedBox>
    </ThemedBox>
  );
}

