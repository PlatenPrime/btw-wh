import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { Banknote, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
}

export function BtradeArtDataContainerView({
  data,
}: BtradeArtDataContainerViewProps) {
  return (
    <div className="text-foreground grid gap-3 text-sm leading-normal">
      <div className="flex gap-3">
        <div className="border-border bg-background text-muted-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
          <Warehouse className="h-4 w-4 text-sky-600" aria-hidden />
        </div>
        <div className="grid min-w-0 gap-0.5">
          <span className="text-muted-foreground text-xs font-medium leading-none tracking-wide uppercase">
            Залишок
          </span>
          <span className="text-foreground text-sm leading-tight font-semibold tabular-nums">
            {data.quantity}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="border-border bg-background text-muted-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
          <Banknote className="h-4 w-4 text-emerald-600" aria-hidden />
        </div>
        <div className="grid min-w-0 gap-0.5">
          <span className="text-muted-foreground text-xs font-medium leading-none tracking-wide uppercase">
            Ціна
          </span>
          <span className="text-foreground text-sm leading-tight font-semibold tabular-nums">
            {data.price} грн
          </span>
        </div>
      </div>
    </div>
  );
}
