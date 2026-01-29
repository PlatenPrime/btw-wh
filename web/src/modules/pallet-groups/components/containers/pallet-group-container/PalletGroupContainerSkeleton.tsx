import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { PalletCardSkeleton } from "@/modules/pallet-groups/components/cards/pallet-card/PalletCardSkeleton";

export function PalletGroupContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-start">
          <Skeleton className="h-9 w-60 rounded-md" />    
      </div>

      <Wrapper className="grid grid-cols-1 gap-2 p-2">
        <PalletCardSkeleton />
        <PalletCardSkeleton />
        <PalletCardSkeleton />
        <PalletCardSkeleton />
      </Wrapper>
    </div>
  );
}
