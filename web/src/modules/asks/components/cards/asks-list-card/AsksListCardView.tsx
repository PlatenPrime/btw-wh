import { Card } from "@/components/ui/card";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskImageStatus } from "@/modules/asks/components/elements/ask-image-status/AskImageStatus";
import { AskerData } from "@/modules/asks/components/cards/asks-list-card/components/AskerData.tsx";
import { AskInfo } from "@/modules/asks/components/cards/asks-list-card/components/AskInfo.tsx";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: string;
}

export function AsksListCardView({
  ask,

  statusText,
}: AsksListCardViewProps) {
  return (
    <Card className="flex flex-row items-start gap-4 p-2">
      <AskImageStatus statusText={statusText} artikul={ask.artikul} />

      <div className="grid gap-2">
        <AskInfo
          nameukr={ask.nameukr || ask.artikul}
          quant={ask.quant || 0}
          com={ask.com || ""}
          id={ask._id}
        />
        <AskerData date={ask.createdAt} askerData={ask.askerData} />
      </div>
    </Card>
  );
}
