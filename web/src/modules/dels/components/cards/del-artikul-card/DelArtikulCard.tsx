import type { DelArtikulItem } from "@/modules/dels/api/types";
import type { DelArtikulCardVariant } from "@/modules/dels/components/cards/del-artikul-card/components/delArtikulCardVariants";
import { DelArtikulCardView } from "./DelArtikulCardView";

export interface DelArtikulCardChainStep {
  status: string;
  error?: string;
}

interface DelArtikulCardProps {
  artikul: string;
  item: DelArtikulItem;
  onRefresh: () => void;
  isUpdating?: boolean;
  disabled?: boolean;
  chainStep?: DelArtikulCardChainStep | null;
  chainRunning?: boolean;
}

function getVariant(item: DelArtikulItem): DelArtikulCardVariant {
  if (!item.nameukr) return "noNameUkr";
  if (item.stock === 0) return "zeroStock";
  if (item.quant === 0) return "zeroQuantity";
  return "normal";
}

export function DelArtikulCard({
  artikul,
  item,
  onRefresh,
  isUpdating = false,
  disabled = false,
  chainStep = null,
  chainRunning = false,
}: DelArtikulCardProps) {
  const variant = getVariant(item);

  return (
    <DelArtikulCardView
      variant={variant}
      artikul={artikul}
      item={item}
      onRefresh={onRefresh}
      isUpdating={isUpdating}
      disabled={disabled}
      chainStep={chainStep}
      chainRunning={chainRunning}
    />
  );
}
