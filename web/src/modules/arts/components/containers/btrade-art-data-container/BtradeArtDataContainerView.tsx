import { cn } from "@/lib/utils";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { ArtMetricFieldRow } from "@/modules/arts/components/elements/art-metric-field-row";
import { Banknote, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
  className?: string;
}

function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat("uk-UA").format(quantity);
}

export function BtradeArtDataContainerView({
  data,
  className,
}: BtradeArtDataContainerViewProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <ArtMetricFieldRow
        icon={Warehouse}
        tone="primary"
        label="Залишок"
        value={formatQuantity(data.quantity)}
        className="w-full"
      />
      <ArtMetricFieldRow
        icon={Banknote}
        tone="success"
        label="Ціна"
        value={`${data.price} грн`}
        className="w-full"
      />
    </div>
  );
}
