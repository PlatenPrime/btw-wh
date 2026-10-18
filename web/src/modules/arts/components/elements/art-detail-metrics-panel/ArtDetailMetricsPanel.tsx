import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import {
  Barcode,
  Box,
  ChevronsLeftRightEllipsis,
  MapPin,
} from "lucide-react";

interface ArtDetailMetricsPanelProps {
  artData: ArtDto;
}

function formatLimit(limit: number): string {
  return new Intl.NumberFormat("uk-UA").format(limit);
}

export function ArtDetailMetricsPanel({ artData }: ArtDetailMetricsPanelProps) {
  const hasLimit = artData.limit != null;
  const bar = artData.bar?.trim();
  const boxbar = artData.boxbar?.trim();

  return (
    <div className="grid gap-2">
      <ArtMetricFieldRow
        icon={MapPin}
        tone="warning"
        label="Зона"
        value={artData.zone}
        className="w-full"
      />
      {hasLimit ? (
        <ArtMetricFieldRow
          icon={ChevronsLeftRightEllipsis}
          tone="destructive"
          label="Ліміт"
          value={formatLimit(artData.limit!)}
          className="w-full"
        />
      ) : null}
      {bar ? (
        <ArtMetricFieldRow
          icon={Barcode}
          tone="info"
          label="Штрихкод"
          value={bar}
          className="w-full"
        />
      ) : null}
      {boxbar ? (
        <ArtMetricFieldRow
          icon={Box}
          tone="muted"
          label="Коробка"
          value={boxbar}
          className="w-full"
        />
      ) : null}
    </div>
  );
}
