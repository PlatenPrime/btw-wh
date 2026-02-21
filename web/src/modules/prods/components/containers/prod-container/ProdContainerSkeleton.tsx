import { ProdDetailsCardSkeleton } from "@/modules/prods/components/cards/prod-details-card";

export function ProdContainerSkeleton() {
  return (
    <div className="grid gap-4 p-4">
      <ProdDetailsCardSkeleton />
    </div>
  );
}
