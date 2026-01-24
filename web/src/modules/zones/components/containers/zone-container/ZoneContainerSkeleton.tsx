import { ZoneDetailsCardSkeleton } from "@/modules/zones/components/cards/zone-details-card";

export function ZoneContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <ZoneDetailsCardSkeleton />
    </div>
  );
}
