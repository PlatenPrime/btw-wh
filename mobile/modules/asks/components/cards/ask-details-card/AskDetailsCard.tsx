import type { AskDto } from "@/modules/asks/api/types/dto";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import { AskDetailsCardView } from "./AskDetailsCardView";

interface AskDetailsCardProps {
  askData: AskDto;
}

export function AskDetailsCard({ askData }: AskDetailsCardProps) {
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
      formattedDate={formattedDate}
      imageUrl={""}
      onImagePress={() => {}}
    />
  );
}
