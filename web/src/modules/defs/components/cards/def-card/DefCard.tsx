import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefCardView } from "@/modules/defs/components/cards/def-card/DefCardView";

interface DefCardProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCard({ artikul, defItem }: DefCardProps) {
  return <DefCardView artikul={artikul} defItem={defItem} />;
}
