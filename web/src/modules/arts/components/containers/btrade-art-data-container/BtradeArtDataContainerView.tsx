import { cn } from "@/lib/utils";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { Banknote, Warehouse } from "lucide-react";

interface BtradeArtDataContainerViewProps {
  data: BtradeArtInfoDto;
  className?: string;
}

export function BtradeArtDataContainerView({
  data,
  className,
}: BtradeArtDataContainerViewProps) {
  return (
    <div
      className={cn(
        "text-foreground grid gap-3 text-sm leading-normal sm:grid-cols-2",
        className,
      )}
    >
      <div className="flex gap-3">
        <div className="border-border bg-background text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-md border">
          <Warehouse className="text-primary size-4" aria-hidden />
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
        <div className="border-border bg-background text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-md border">
          <Banknote className="text-success size-4" aria-hidden />
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
