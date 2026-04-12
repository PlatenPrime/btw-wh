import type { CardAction } from "@/components/shared/card-actions/types";
import type { KaskDto } from "@/modules/kasks/api/types/dto";
import { KasksListCardView } from "@/modules/kasks/components/cards/kasks-list-card/KasksListCardView";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";

interface KasksListCardProps {
  kask: KaskDto;
  isDeleteDisabled: boolean;
  onRequestDelete: () => void;
}

export function KasksListCard({
  kask,
  isDeleteDisabled,
  onRequestDelete,
}: KasksListCardProps) {
  const actions = useMemo<CardAction[]>(
    () => [
      {
        id: "delete",
        label: "Видалити",
        icon: Trash2,
        variant: "destructive",
        onClick: onRequestDelete,
      },
    ],
    [onRequestDelete],
  );

  return (
    <KasksListCardView
      kask={kask}
      actions={actions}
      isMenuDisabled={isDeleteDisabled}
    />
  );
}
