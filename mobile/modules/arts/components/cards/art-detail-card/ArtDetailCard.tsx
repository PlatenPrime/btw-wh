import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCardView } from "./ArtDetailCardView";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ArtDetailCardView artData={artData} bgColor={bgColor} borderColor={borderColor} />
  );
}

