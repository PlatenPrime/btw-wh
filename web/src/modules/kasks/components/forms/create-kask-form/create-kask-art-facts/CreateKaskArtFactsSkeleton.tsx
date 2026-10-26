import { Skeleton } from "@/components/ui/skeleton";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import { Banknote, MapPin, Warehouse } from "lucide-react";

function FactValueSkeleton() {
  return <Skeleton className="h-4 w-16" />;
}

export function CreateKaskArtFactsSkeleton() {
  return (
    <div className="grid gap-2">
      <ArtMetricFieldRow
        icon={MapPin}
        tone="info"
        label="Зона"
        value={<FactValueSkeleton />}
        className="w-full"
      />
      <ArtMetricFieldRow
        icon={Warehouse}
        tone="primary"
        label="Залишок"
        value={<FactValueSkeleton />}
        className="w-full"
      />
      <ArtMetricFieldRow
        icon={Banknote}
        tone="success"
        label="Ціна"
        value={<FactValueSkeleton />}
        className="w-full"
      />
    </div>
  );
}
