import { sklads, type ISklads } from "@/constants/sklad";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { MapPin, Warehouse } from "lucide-react";

interface AskDetailsLocationRowProps {
  sklad?: AskDto["sklad"];
  zone?: string;
}

export function AskDetailsLocationRow({
  sklad,
  zone,
}: AskDetailsLocationRowProps) {
  const skladLabel = sklad
    ? sklads[sklad as keyof ISklads] || sklad
    : null;
  const hasSklad = Boolean(skladLabel);
  const hasZone = Boolean(zone);

  if (!hasSklad && !hasZone) {
    return null;
  }

  return (
    <div className="border-border/40 flex flex-wrap items-center gap-2 border-t px-4 py-2.5">
      {hasSklad ? (
        <span className="bg-muted/60 text-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium">
          <Warehouse className="text-muted-foreground size-4 shrink-0" />
          {skladLabel}
        </span>
      ) : null}
      {hasZone ? (
        <span className="bg-muted/60 text-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium">
          <MapPin className="text-warning size-4 shrink-0" />
          {zone}
        </span>
      ) : null}
    </div>
  );
}
