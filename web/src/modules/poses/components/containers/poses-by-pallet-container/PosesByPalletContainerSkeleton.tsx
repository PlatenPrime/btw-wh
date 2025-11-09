import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { PosInPalletCardSkeleton } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardSkeleton";

export function PosesByPalletContainerSkeleton() {
  return (
    <Wrapper className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PosInPalletCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
