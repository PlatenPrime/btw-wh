import { DetailPanelCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";
import { PosesByPalletContainerSkeleton } from "@/modules/poses/components/containers/poses-by-pallet-container";

export function PalletContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <DetailPanelCard className="p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex w-full justify-start sm:order-2 sm:min-w-0 sm:w-auto sm:flex-1 sm:justify-center">
            <Skeleton className="h-9 w-40" />
          </div>

          <div className="flex w-full items-center justify-between gap-3 sm:contents">
            <Skeleton className="h-9 w-40 sm:order-1" />
            <Skeleton className="h-9 w-36 shrink-0 sm:order-3" />
          </div>
        </div>
      </DetailPanelCard>

      <PosesByPalletContainerSkeleton />
    </div>
  );
}
