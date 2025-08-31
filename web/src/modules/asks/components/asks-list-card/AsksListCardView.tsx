import { type BadgeProps } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskerData } from "./components/AskerData";
import { AskImageStatus } from "./components/AskImageStatus";
import { AskInfo } from "./components/AskInfo";

interface AsksListCardViewProps {
  ask: AskDto;
  statusVariant: BadgeProps["variant"];
  statusText: string;
}

export function AsksListCardView({
  ask,
  statusVariant,
  statusText,
}: AsksListCardViewProps) {
  return (
    <Card className="flex flex-row flex-wrap gap-4 items-center">
      <AskImageStatus
        statusVariant={statusVariant}
        statusText={statusText}
        artikul={ask.artikul}
      />

      <div className="grid gap-2">
        <AskInfo
          nameukr={ask.nameukr || ask.artikul}
          quant={ask.quant || 0}
          com={ask.com || ""}
        />
        <AskerData date={ask.createdAt} askerData={ask.askerData} />
      </div>
    </Card>
  );
}
