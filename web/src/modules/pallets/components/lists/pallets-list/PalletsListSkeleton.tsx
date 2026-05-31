import { SurfaceSection } from "@/components/shared/layout";
import { PalletInRowCardSkeleton } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardSkeleton";

export function PalletsListSkeleton() {
  return (
    <SurfaceSection className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PalletInRowCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
