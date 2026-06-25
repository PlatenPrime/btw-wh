import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import { ListRowCard } from "@/components/shared/cards";
import type { DelArtikulItem } from "@/modules/dels/api/types";
import { DelArtikulCardActions } from "@/modules/dels/components/cards/del-artikul-card/components/DelArtikulCardActions";
import { DelArtikulCardQuants } from "@/modules/dels/components/cards/del-artikul-card/components/DelArtikulCardQuants";
import {
  getDelArtikulCardClassName,
  type DelArtikulCardVariant,
  type DelArtikulCardViewChainStep,
} from "@/modules/dels/components/cards/del-artikul-card/components/delArtikulCardVariants";

export type { DelArtikulCardVariant, DelArtikulCardViewChainStep };

interface DelArtikulCardViewProps {
  variant: DelArtikulCardVariant;
  artikul: string;
  item: DelArtikulItem;
  onRefresh: () => void;
  isUpdating?: boolean;
  disabled?: boolean;
  chainStep?: DelArtikulCardViewChainStep | null;
  chainRunning?: boolean;
}

export function DelArtikulCardView({
  variant,
  artikul,
  item,
  onRefresh,
  isUpdating = false,
  disabled = false,
  chainStep = null,
  chainRunning = false,
}: DelArtikulCardViewProps) {
  const showChainStatus = Boolean(chainRunning && chainStep);

  return (
    <ListRowCard className={getDelArtikulCardClassName(variant)}>
      <ArtikulImageLink
        artikul={artikul}
        nameukr={item.nameukr}
        className="min-w-0 w-full sm:flex-1"
      />

      <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
        <DelArtikulCardQuants item={item} />
        <DelArtikulCardActions
          showChainStatus={showChainStatus}
          chainStep={chainStep}
          onRefresh={onRefresh}
          isUpdating={isUpdating}
          disabled={disabled}
        />
      </div>
    </ListRowCard>
  );
}
