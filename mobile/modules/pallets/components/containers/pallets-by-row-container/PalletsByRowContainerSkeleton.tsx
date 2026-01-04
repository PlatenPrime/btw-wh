import { ThemedBox } from "@/components/themed";
import { PalletCardSkeleton } from "@/modules/pallets/components/cards/pallet-card/PalletCardSkeleton";

export function PalletsByRowContainerSkeleton() {
  return (
    <ThemedBox className="flex-1 p-2">
      {Array.from({ length: 16 }, (_, index) => index).map((index) => (
        <ThemedBox key={index} className="mb-2">
          <PalletCardSkeleton />
        </ThemedBox>
      ))}
    </ThemedBox>
  );
}
