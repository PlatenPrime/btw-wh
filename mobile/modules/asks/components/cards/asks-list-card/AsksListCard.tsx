import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "./AsksListCardView";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface AsksListCardProps {
  ask: AskDto;
}

export function AsksListCard({ ask }: AsksListCardProps) {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <AsksListCardView
      ask={ask}
      bgColor={bgColor}
      borderColor={borderColor}
    />
  );
}

