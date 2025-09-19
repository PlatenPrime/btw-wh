import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { DollarSign, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <div className="flex gap-2">
      <p className="text-foreground flex items-center text-nowrap">
        <Warehouse size={12} className="text-sky-500" />
        {data.quantity}
      </p>
      <p className="text-foreground flex items-center text-nowrap">
        <DollarSign size={12} className="text-emerald-500" />
        {data.price} грн
      </p>
    </div>
  );
}
