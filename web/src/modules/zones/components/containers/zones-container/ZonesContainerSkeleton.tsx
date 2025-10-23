import { ZonesGridSkeleton } from "@/modules/zones/components/lists/zones-grid";

export function ZonesContainerSkeleton() {
  return (
    <div className="space-y-4">
      <ZonesGridSkeleton count={8} />
      <div className="flex justify-center">
        <div className="h-10 w-64 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

