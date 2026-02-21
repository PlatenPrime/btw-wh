import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { DelArtikulCard } from "@/modules/dels/components/cards/del-artikul-card";
import type { DelArtikulItem } from "@/modules/dels/api/types";

export interface DelArtikulsListViewItem {
  artikul: string;
  item: DelArtikulItem;
  onRefresh: () => void;
  isUpdating: boolean;
  disabled: boolean;
  chainStep: { status: string; error?: string } | null;
  chainRunning: boolean;
}

interface DelArtikulsListViewProps {
  empty: boolean;
  items: DelArtikulsListViewItem[];
}

export function DelArtikulsListView({ empty, items }: DelArtikulsListViewProps) {
  if (empty) {
    return (
      <Wrapper>
        <p className="text-muted-foreground text-sm">
          У поставці ще немає артикулів.
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {items.map(({ artikul, item, onRefresh, isUpdating, disabled, chainStep, chainRunning }) => (
        <DelArtikulCard
          key={artikul}
          artikul={artikul}
          item={item}
          onRefresh={onRefresh}
          isUpdating={isUpdating}
          disabled={disabled}
          chainStep={chainStep}
          chainRunning={chainRunning}
        />
      ))}
    </Wrapper>
  );
}
