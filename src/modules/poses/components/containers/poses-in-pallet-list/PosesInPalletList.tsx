import type { IPos } from "@/modules/poses/api";
import { PosesInPalletListEmpty } from "./PosesInPalletListEmpty";
import { PosesInPalletListView } from "./PosesInPalletListView";

interface PosesInPalletListProps {
  poses: IPos[];
}

export function PosesInPalletList({ poses }: PosesInPalletListProps) {
  if (poses.length === 0) {
    return <PosesInPalletListEmpty />;
  }

  return <PosesInPalletListView poses={poses} />;
}
