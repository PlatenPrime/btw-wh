import { ThemedBox } from "@/components/themed";

export function BtradeArtDataSkeleton() {
  return (
    <ThemedBox className="gap-2">
      <ThemedBox className="flex-row items-center gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
      </ThemedBox>
      <ThemedBox className="flex-row items-center gap-2">
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 16 }} />
        <ThemedBox className="rounded bg-secondary-300" style={{ height: 16, width: 48 }} />
      </ThemedBox>
    </ThemedBox>
  );
}

