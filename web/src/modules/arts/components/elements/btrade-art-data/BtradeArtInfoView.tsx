import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { DollarSign, Warehouse } from "lucide-react";

interface BtradeArtInfoProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtInfoView({ data }: BtradeArtInfoProps) {

  return (
    <div className="flex flex-wrap gap-2">
      <p className="text-muted-foreground flex items-center gap-1 text-nowrap">
        <DollarSign size={16} className="text-emerald-500" />
        {data.price} грн
      </p>
      <p className="text-muted-foreground flex items-center gap-1 text-nowrap">
        <Warehouse size={16} className="text-sky-500" />
        {data.quantity}
      </p>
    </div>
  );
}
