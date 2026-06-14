import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import {
  ChevronsLeftRightEllipsis,
  MapPin
} from "lucide-react";

interface ArtDetailMetricsPanelProps {
  artData: ArtDto;
}

function formatLimit(limit: number): string {
  return new Intl.NumberFormat("uk-UA").format(limit);
}

export function ArtDetailMetricsPanel({ artData }: ArtDetailMetricsPanelProps) {
  const hasLimit = artData.limit != null;

  return (
    <div className="grid gap-3">
      <ArtMetricFieldRow
        icon={MapPin}
        iconClassName="text-orange-500"
        label="Зона"
        value={artData.zone}
      />
      {hasLimit ? (
        <ArtMetricFieldRow
          icon={ChevronsLeftRightEllipsis}
          iconClassName="text-rose-500"
          label="Ліміт"
          value={formatLimit(artData.limit!)}
        />
      ) : null}
      
    </div>
  );
}
