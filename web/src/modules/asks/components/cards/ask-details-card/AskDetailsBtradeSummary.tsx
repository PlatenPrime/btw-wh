import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { AskDetailsSummaryField } from "@/modules/asks/components/cards/ask-details-card/AskDetailsSummaryField";

interface AskDetailsBtradeSummaryProps {
  data: BtradeArtInfoDto;
}

export function AskDetailsBtradeSummary({ data }: AskDetailsBtradeSummaryProps) {
  return (
    <>
      <AskDetailsSummaryField label="Залишок" value={data.quantity} />
      <AskDetailsSummaryField
        label="Ціна"
        value={`${data.price} грн`}
      />
    </>
  );
}
