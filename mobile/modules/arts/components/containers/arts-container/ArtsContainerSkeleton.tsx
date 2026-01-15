import { ThemedBox } from "@/components/themed";
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton";

export function ArtsContainerSkeleton() {
  return (
    <ThemedBox className="flex-1">
      <ThemedBox className="p-2">
        <ThemedBox className="flex-row items-center rounded-lg border border-outline-50 bg-background-0 px-3 gap-2">
          <ThemedBox className="rounded bg-secondary-300" style={{ height: 20, width: 20 }} />
          <ThemedBox className="flex-1 rounded bg-secondary-300" style={{ height: 48 }} />
        </ThemedBox>
      </ThemedBox>
      <ThemedBox className="flex-1">
        <ArtsGridSkeleton />
      </ThemedBox>
    </ThemedBox>
  );
}
