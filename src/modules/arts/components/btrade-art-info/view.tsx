import type { BtradeArtInfoDto } from "@/modules/arts/types/dto";
import { DollarSign, MapPin, Warehouse } from "lucide-react";

interface BtradeArtInfoProps {
  info: BtradeArtInfoDto | null;
  zone?: string;
}

export function BtradeArtInfo({ info, zone }: BtradeArtInfoProps) {
  if (!info) {
    return <p>No information available</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <p className="text-muted-foreground flex items-center gap-1 text-nowrap">
        <MapPin size={16} className="text-orange-500" /> {zone}
      </p>
      <p className="text-muted-foreground flex items-center gap-1 text-nowrap">
        <DollarSign size={16} className="text-emerald-500" />
        {info.price} грн
      </p>
      <p className="text-muted-foreground flex items-center gap-1 text-nowrap">
        <Warehouse size={16} className="text-sky-500" />
        {info.quantity}
      </p>
    </div>
  );
}
