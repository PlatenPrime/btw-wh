import type { AnalogStockDto } from "@/modules/analogs/api/types";
import { DollarSign, Warehouse } from "lucide-react";

interface AnalogStockContainerViewProps {
  data: AnalogStockDto;
}

export function AnalogStockContainerView({
  data,
}: AnalogStockContainerViewProps) {
  return (
    <div className="text-foreground grid gap-2 text-sm">
      <p className="flex items-center gap-2 text-nowrap">
        <Warehouse className="h-4 w-4 text-sky-500" />
        <span>{data.stock}</span>
      </p>
      <p className="flex items-center gap-2 text-nowrap">
        <DollarSign className="h-4 w-4 text-emerald-500" />
        <span>{data.price} грн</span>
      </p>
    </div>
  );
}
