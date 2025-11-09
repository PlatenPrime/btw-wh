import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { PalletInRowCardSkeleton } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardSkeleton";

export function PalletsListSkeleton() {
  return (
    <Wrapper className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PalletInRowCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
