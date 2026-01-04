import { ThemedBox } from "@/components/themed";

export function RowCardSkeleton() {
  return (
    <ThemedBox className="p-4 rounded-lg border border-outline-100 bg-background-0 items-center">
      <ThemedBox className="items-center gap-2">
        <ThemedBox
          className="rounded bg-secondary-300"
          style={{ height: 24, width: 96 }}
        />
      </ThemedBox>
    </ThemedBox>
  );
}
