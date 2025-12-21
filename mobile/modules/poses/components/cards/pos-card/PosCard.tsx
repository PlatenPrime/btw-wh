import { sklads, type ISklads } from "@/constants/sklad";
import type { IPos } from "@/modules/poses/api/types";
import { PosCardMenu } from "@/modules/poses/components/menus/pos-card-menu/PosCardMenu";
import { PosCardView } from "./PosCardView";

interface PosCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosCard({ pos, onSuccess }: PosCardProps) {
  const skladName = sklads[pos.sklad as keyof ISklads] || pos.sklad;

  return (
    <PosCardView
      pos={pos}
      skladName={skladName}
      menu={<PosCardMenu pos={pos} onSuccess={onSuccess} />}
    />
  );
}
