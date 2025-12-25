import { useRouter } from "expo-router";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "./AsksListCardView";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface AsksListCardProps {
  ask: AskDto;
}

export function AsksListCard({ ask }: AsksListCardProps) {
  const router = useRouter();
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  const handlePress = () => {
    router.push(`/refiling/asks/${ask._id}` as any);
  };

  return (
    <AsksListCardView
      ask={ask}
      bgColor={bgColor}
      borderColor={borderColor}
      onPress={handlePress}
    />
  );
}

