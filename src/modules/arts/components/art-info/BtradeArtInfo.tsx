import type { BtradeArtInfoDto } from "@/modules/arts/types/dto";
import { DollarSign, Warehouse } from "lucide-react";



interface BtradeArtInfoProps {
  info: BtradeArtInfoDto | null;
}

export function BtradeArtInfo({ info }: BtradeArtInfoProps) {
  if (!info) {
    return <p>No information available</p>;
  }

  return (
    <section className="flex flex-col gap-2">
      <p className="flex items-center gap-1 text-muted-foreground" ><DollarSign />{info.price} грн</p>
      <p className="flex items-center gap-1 text-muted-foreground"><Warehouse />{info.quantity}</p>
    </section>
  );
}
