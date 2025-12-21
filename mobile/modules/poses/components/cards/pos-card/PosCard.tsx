import type { IPos } from "@/modules/poses/api/types";
import { PosCardView } from "./PosCardView";

interface PosCardProps {
  pos: IPos;
}

const sklads: Record<string, string> = {
  pogrebi: "Погреби",
  merezhi: "Мережі",
};

export function PosCard({ pos }: PosCardProps) {
  const skladName = sklads[pos.sklad] || pos.sklad;

  return (
    <PosCardView
      pos={pos}
      skladName={skladName}
    />
  );
}

