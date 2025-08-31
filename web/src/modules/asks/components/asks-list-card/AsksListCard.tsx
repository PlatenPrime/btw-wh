import type { BadgeProps } from "@/components/ui/badge";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "./AsksListCardView";

interface AsksListCardProps {
  ask: AskDto;
}

const statusStyles = {
  new: "default",
  in_progress: "secondary",
  completed: "outline",
  cancelled: "destructive",
};

const statusTexts = {
  new: "Новий",
  in_progress: "В роботі",
  completed: "Завершено",
  cancelled: "Скасовано",
};

const getStatusVariant = (status: AskDto["status"]) => {
  return statusStyles[status] || "default";
};

const getStatusText = (status: AskDto["status"]) => {
  return statusTexts[status] || status;
};

export function AsksListCard({ ask }: AsksListCardProps) {
  return (
    <AsksListCardView
      ask={ask}
      statusVariant={getStatusVariant(ask.status) as BadgeProps["variant"]}
      statusText={getStatusText(ask.status)}
    />
  );
}
