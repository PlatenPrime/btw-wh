import type { AskDto } from "@/modules/asks/api/types/dto";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { AskDetailsCardView } from "./AskDetailsCardView";
import { formatDateTime } from "@/modules/asks/utils/format-date";

interface AskDetailsCardProps {
  askData: AskDto;
}

export function AskDetailsCard({ askData }: AskDetailsCardProps) {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  const formattedDate = formatDateTime(askData.createdAt);

  return (
    <AskDetailsCardView
      artikul={askData.artikul}
      nameukr={askData.nameukr}
      status={askData.status}
      quant={askData.quant}
      com={askData.com}
      sklad={askData.sklad}
      askerData={askData.askerData}
      createdAt={askData.createdAt}
      bgColor={bgColor}
      borderColor={borderColor}
      formattedDate={formattedDate}
      imageUrl={""}
      onImagePress={() => {}}
    />
  );
}

