import { PalletsListSkeleton } from "@/modules/pallets/components/lists/pallets-list/PalletsListSkeleton";

export function RowContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <PalletsListSkeleton />
    </div>
  );
}
