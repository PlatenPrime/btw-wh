import { SemanticColors } from "@/constants/theme";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { useTheme } from "@/providers/theme-provider";
import { AsksListCardView } from "./AsksListCardView";

interface AsksListCardProps {
  ask: AskDto;
}

export function AsksListCard({ ask }: AsksListCardProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const bgColor = SemanticColors.card.bg[theme];
  const borderColor = SemanticColors.card.border[theme];

  return (
    <AsksListCardView ask={ask} bgColor={bgColor} borderColor={borderColor} />
  );
}
