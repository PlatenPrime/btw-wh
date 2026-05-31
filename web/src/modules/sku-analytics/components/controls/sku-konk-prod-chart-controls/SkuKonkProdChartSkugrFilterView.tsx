import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectSkugrsDialog } from "@/modules/skugrs/components/dialogs/select-skugrs-dialog";
import { Layers, X } from "lucide-react";

export interface SkuKonkProdChartSkugrFilterViewProps {
  skugrIds: string[];
  onSkugrIdsChange: (ids: string[]) => void;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  konkName: string;
  prodNameForList: string;
  disabled: boolean;
}

export function SkuKonkProdChartSkugrFilterView({
  skugrIds,
  onSkugrIdsChange,
  isDialogOpen,
  onDialogOpenChange,
  konkName,
  prodNameForList,
  disabled,
}: SkuKonkProdChartSkugrFilterViewProps) {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="min-w-[160px] justify-start gap-2 sm:min-w-[180px]"
        disabled={disabled}
        onClick={() => onDialogOpenChange(true)}
      >
        <Layers className="size-4 shrink-0" />
        Товарні групи
      </Button>

      {skugrIds.length > 0 ? (
        <Badge
          variant="secondary"
          className="flex max-w-full items-center gap-1 py-1 pr-1"
        >
          <span className="truncate">Груп: {skugrIds.length}</span>
          <button
            type="button"
            className="hover:bg-secondary/80 rounded p-0.5"
            aria-label="Скинути фільтр товарних груп"
            onClick={() => onSkugrIdsChange([])}
          >
            <X className="size-3.5 shrink-0" />
          </button>
        </Badge>
      ) : null}

      <SelectSkugrsDialog
        open={isDialogOpen}
        onOpenChange={onDialogOpenChange}
        konkName={konkName}
        prodNameForList={prodNameForList}
        value={skugrIds}
        onConfirm={onSkugrIdsChange}
      />
    </>
  );
}
