import { useTheme } from "@/providers/theme-provider";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCardView } from "./ArtDetailCardView";
import { SemanticColors } from "@/constants/theme";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const bgColor = theme === "light" ? SemanticColors.card.bg.light : SemanticColors.card.bg.dark;
  const borderColor = theme === "light" ? SemanticColors.card.border.light : SemanticColors.card.border.dark;

  return (
    <ArtDetailCardView artData={artData} bgColor={bgColor} borderColor={borderColor} />
  );
}

