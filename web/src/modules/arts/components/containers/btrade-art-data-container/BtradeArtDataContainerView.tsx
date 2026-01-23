import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { DollarSign, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <div className="text-foreground grid gap-2 text-sm">
      <p className="flex items-center gap-2 text-nowrap">
        <Warehouse className="h-4 w-4 text-sky-500" />
        <span>{data.quantity}</span>
      </p>
      <p className="flex items-center gap-2 text-nowrap">
        <DollarSign className="h-4 w-4 text-emerald-500" />
        <span>{data.price} грн</span>
      </p>
    </div>
  );
}
