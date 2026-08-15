import { MetricChip } from "@/components/shared/elements";
import { ChevronsLeftRightEllipsis } from "lucide-react";

interface ArtLimitProps {
  limit: number | undefined;
}

export function ArtLimit({ limit }: ArtLimitProps) {
  if (!limit) return null;
  return (
    <MetricChip
      icon={ChevronsLeftRightEllipsis}
      tone="destructive"
      label="Ліміт"
      value={limit}
    />
  );
}
