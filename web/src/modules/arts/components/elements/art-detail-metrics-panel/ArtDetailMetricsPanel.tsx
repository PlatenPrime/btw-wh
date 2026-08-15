import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import { ChevronsLeftRightEllipsis, MapPin } from "lucide-react";

interface ArtDetailMetricsPanelProps {
  artData: ArtDto;
}

function formatLimit(limit: number): string {
  return new Intl.NumberFormat("uk-UA").format(limit);
}

export function ArtDetailMetricsPanel({ artData }: ArtDetailMetricsPanelProps) {
  const hasLimit = artData.limit != null;

  return (
    <div className="flex flex-wrap gap-2">
      <ArtMetricFieldRow
        icon={MapPin}
        tone="warning"
        label="Зона"
        value={artData.zone}
      />
      {hasLimit ? (
        <ArtMetricFieldRow
          icon={ChevronsLeftRightEllipsis}
          tone="destructive"
          label="Ліміт"
          value={formatLimit(artData.limit!)}
        />
      ) : null}
    </div>
  );
}
