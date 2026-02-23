import { KonkDetailsCardSkeleton } from "@/modules/konks/components/cards/konk-details-card";

export function KonkContainerSkeleton() {
  return (
    <div className="grid gap-4 p-4">
      <KonkDetailsCardSkeleton />
    </div>
  );
}
