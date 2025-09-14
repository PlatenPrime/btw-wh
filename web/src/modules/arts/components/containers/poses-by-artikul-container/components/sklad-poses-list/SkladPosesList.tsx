import { Container } from "@/components/container";
import type { WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";
import { PalletLink } from "../pallet-link/PalletLink";

export function SkladPosesList({
  skladData,
  title,
}: {
  skladData: WarehouseData;
  title: string;
}) {
  return (
    <Container className="grid gap-2">
      <div className="grid grid-cols-3">
        <h3 className="pl-4 font-semibold">{title}</h3>
        <div className="flex items-center justify-center gap-1 font-semibold">
          <Package className="h-3 w-3" />
          <span>{skladData.boxes || 0}</span>
        </div>
        <div className="flex items-center justify-end gap-1 font-semibold pr-2">
          <Circle className="h-3 w-3" />
          <span>{skladData.quant || 0}</span>
        </div>
      </div>

      {skladData.poses?.length > 0 && (
        <div className="grid gap-2">
          {skladData.poses?.map((pos) => (
            <PalletLink pos={pos} />
          ))}
        </div>
      )}
    </Container>
  );
}
