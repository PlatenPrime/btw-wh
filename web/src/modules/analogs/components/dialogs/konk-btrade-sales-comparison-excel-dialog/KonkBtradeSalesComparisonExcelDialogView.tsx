import { KonkBtradeExcelDialogLayout } from "@/modules/analogs/components/dialogs/konk-btrade-excel-dialog-layout/KonkBtradeExcelDialogLayout";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { DateRange } from "react-day-picker";

interface KonkBtradeSalesComparisonExcelDialogViewProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  konks: KonkDto[];
  prods: ProdDto[];
  selectedKonk: string;
  onSelectedKonkChange: (value: string) => void;
  selectedProd: string;
  onSelectedProdChange: (value: string) => void;
  selectedAbc: string;
  onSelectedAbcChange: (value: string) => void;
  sortByAbc: boolean;
  onSortByAbcChange: (value: boolean) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function KonkBtradeSalesComparisonExcelDialogView(
  props: KonkBtradeSalesComparisonExcelDialogViewProps
) {
  return (
    <KonkBtradeExcelDialogLayout
      {...props}
      title="Експорт Excel порівняння продаж та виручки"
      description={
        <>
          Оберіть конкурента, виробника та період дат для формування звіту.
          Файл міститиме продажі (різницю залишків по днях), ціни та виручку
          аналогів цього конкурента по виробнику та Btrade за обраний період,
          колонки «Всього» та дельти (Δ Продажі, Δ Виручка).
        </>
      }
      sortByAbcSwitchId="sort-by-abc-sales"
    />
  );
}
