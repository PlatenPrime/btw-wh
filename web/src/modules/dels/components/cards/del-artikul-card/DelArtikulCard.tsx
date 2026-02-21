import type { DelArtikulItem } from "@/modules/dels/api/types";
import {
  DelArtikulCardView,
  type DelArtikulCardVariant,
} from "./DelArtikulCardView";

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
  const isZeroQuantity = item.quantity === 0;
  const hasNoNameUkr = !item.nameukr;
  // return isZeroQuantity ? "zeroQuantity" : hasNoNameUkr ? "noNameUkr" : "normal";
  return hasNoNameUkr ? "noNameUkr" : isZeroQuantity ? "zeroQuantity" : "normal";
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
