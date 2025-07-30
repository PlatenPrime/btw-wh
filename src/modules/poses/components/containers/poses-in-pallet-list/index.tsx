import type { IPos } from "@/modules/poses/types";
import { PosesInPalletListEmpty } from "./empty-list";
import { PosesInPalletListView } from "./view";

interface PosesInPalletListProps {
  poses: IPos[];
}

export function PosesInPalletList({ poses }: PosesInPalletListProps) {
  if (poses.length === 0) {
    return <PosesInPalletListEmpty />;
  }

  return <PosesInPalletListView poses={poses} />;
}
