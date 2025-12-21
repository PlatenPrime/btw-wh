import { useColorScheme } from "@/hooks/use-color-scheme";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCardView } from "./ArtDetailCardView";
import { SemanticColors } from "@/constants/theme";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? SemanticColors.card.bg.light : SemanticColors.card.bg.dark;
  const borderColor = colorScheme === "light" ? SemanticColors.card.border.light : SemanticColors.card.border.dark;

  return (
    <ArtDetailCardView artData={artData} bgColor={bgColor} borderColor={borderColor} />
  );
}

