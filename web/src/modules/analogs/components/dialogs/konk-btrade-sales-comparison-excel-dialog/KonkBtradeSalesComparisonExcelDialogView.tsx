import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { EntityLabel } from "@/modules/analogs/components/entity-label/EntityLabel";
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
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function KonkBtradeSalesComparisonExcelDialogView({
  dateRange,
  onDateRangeChange,
  konks,
  prods,
  selectedKonk,
  onSelectedKonkChange,
  selectedProd,
  onSelectedProdChange,
  isDownloading,
  onDownload,
  onCancel,
}: KonkBtradeSalesComparisonExcelDialogViewProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;
  const isFormValid =
    selectedKonk !== "" && selectedProd !== "" && isRangeValid;

  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Експорт Excel порівняння продаж та виручки</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          Оберіть конкурента, виробника та період дат для формування звіту.
          Файл міститиме продажі (різницю залишків по днях), ціни та виручку
          аналогів цього конкурента по виробнику та Btrade за обраний період,
          колонки «Всього» та дельти (Δ Продажі, Δ Виручка).
        </p>

        <div className="grid gap-3 ">
          <div className="grid gap-1.5">
            <span className="text-sm font-medium">Конкурент</span>
            <Select
              value={selectedKonk}
              onValueChange={onSelectedKonkChange}
            >
              <SelectTrigger aria-label="Конкурент">
                <SelectValue placeholder="Оберіть конкурента" />
              </SelectTrigger>
              <SelectContent>
                {konks.map((k) => (
                  <SelectItem key={k._id} value={k.name}>
                    <EntityLabel
                      imageUrl={k.imageUrl}
                      title={k.title}
                      fallbackLabel={k.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <span className="text-sm font-medium">Виробник</span>
            <Select
              value={selectedProd}
              onValueChange={onSelectedProdChange}
            >
              <SelectTrigger aria-label="Виробник">
                <SelectValue placeholder="Оберіть виробника" />
              </SelectTrigger>
              <SelectContent>
                {prods.map((p) => (
                  <SelectItem key={p._id} value={p.name}>
                    <EntityLabel
                      imageUrl={p.imageUrl}
                      title={p.title}
                      fallbackLabel={p.name}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium">Період дат</span>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            disabled={(date) => date > new Date()}
            numberOfMonths={1}
          />
        </div>

        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Обчислення..."
          isDisabled={!isFormValid}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
