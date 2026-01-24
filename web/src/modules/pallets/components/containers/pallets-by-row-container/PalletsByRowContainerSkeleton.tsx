import { PalletInRowCardSkeleton } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardSkeleton";

export function PalletsByRowContainerSkeleton() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <PalletInRowCardSkeleton key={index} />
      ))}
    </div>
  );
}
