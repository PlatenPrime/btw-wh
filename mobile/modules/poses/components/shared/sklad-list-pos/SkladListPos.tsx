import type { PosResponse } from "@/modules/poses/api/types";
import { SkladListPosView } from "./SkladListPosView";

interface SkladListPosProps {
  pos: PosResponse;
  onClick?: () => void;
}

export function SkladListPos({ pos, onClick }: SkladListPosProps) {
  if (!pos.data) {
    return null;
  }

  return <SkladListPosView pos={pos.data} onPress={onClick} />;
}

