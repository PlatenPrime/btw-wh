import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { DollarSign, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <div className="grid text-xs ">
      <p className="text-foreground flex items-center gap-1 text-nowrap">
        <Warehouse size={12} className="text-sky-500" />
        <span className="">{data.quantity}</span>
       
      </p>
      <p className="text-foreground flex items-center gap-1 text-nowrap">
        <DollarSign size={12} className="text-emerald-500" />
        <span className="">{data.price} грн</span>
      </p>
    </div>
  );
}
