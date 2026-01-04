import { ThemedBox } from "@/components/themed";
import { PosCardSkeleton } from "@/modules/poses/components/cards/pos-card/PosCardSkeleton";

export function PosesByPalletContainerSkeleton() {
  return (
    <ThemedBox className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <ThemedBox key={index} className="mb-2">
          <PosCardSkeleton />
        </ThemedBox>
      ))}
    </ThemedBox>
  );
}
