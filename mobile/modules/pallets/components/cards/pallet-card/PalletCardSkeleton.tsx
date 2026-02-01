import { ThemedBox } from "@/components/themed";

export function PalletCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-2xl border border-outline-100 bg-background-0 shadow-hard-2 gap-2">
      <ThemedBox className="flex-row items-center justify-between">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 20, width: 96 }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
      </ThemedBox>
    </ThemedBox>
  );
}

