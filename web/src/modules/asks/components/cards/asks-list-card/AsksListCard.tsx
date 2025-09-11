import type { BadgeProps } from "@/components/ui/badge";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "./AsksListCardView";
import { statusConfig } from "@/modules/arts/constants/status";

interface AsksListCardProps {
  ask: AskDto;
}




export function AsksListCard({ ask }: AsksListCardProps) {
  return (
    <AsksListCardView
      ask={ask}
      statusVariant={statusConfig[ask.status].variant as BadgeProps["variant"]}
      statusText={statusConfig[ask.status].text}
    />
  );
}
