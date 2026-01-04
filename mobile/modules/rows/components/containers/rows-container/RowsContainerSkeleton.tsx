import { ThemedBox } from "@/components/themed";
import { RowCardSkeleton } from "@/modules/rows/components/cards/row-card/RowCardSkeleton";

export function RowsContainerSkeleton() {
  return (
    <ThemedBox className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <ThemedBox key={index} className="mb-2">
          <RowCardSkeleton />
        </ThemedBox>
      ))}
    </ThemedBox>
  );
}
