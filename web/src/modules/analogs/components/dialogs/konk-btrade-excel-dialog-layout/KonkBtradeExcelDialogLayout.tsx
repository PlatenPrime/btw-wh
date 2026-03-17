import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

const ABC_OPTIONS = [
  { value: "all", label: "ABC" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
] as const;

export interface KonkBtradeExcelDialogLayoutProps {
  title: string;
  description: React.ReactNode;
  sortByAbcSwitchId: string;
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

export function KonkBtradeExcelDialogLayout({
  title,
  description,
  sortByAbcSwitchId,
  dateRange,
  onDateRangeChange,
  konks,
  prods,
  selectedKonk,
  onSelectedKonkChange,
  selectedProd,
  onSelectedProdChange,
  selectedAbc,
  onSelectedAbcChange,
  sortByAbc,
  onSortByAbcChange,
  isDownloading,
  onDownload,
  onCancel,
}: KonkBtradeExcelDialogLayoutProps) {
  const from = dateRange?.from;
  const to = dateRange?.to;
  const isRangeValid =
    from !== undefined && to !== undefined && from <= to;
  const isFormValid =
    selectedKonk !== "" && selectedProd !== "" && isRangeValid;

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 items-center w-full">
        <p className="text-muted-foreground text-sm text-justify max-w-md">
          {description}
        </p>

        <div className="grid gap-3 w-full justify-center">
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

          <div className="grid grid-cols-2 gap-2 w-full justify-center">
            <div className="grid gap-1.5">
              <Select
                value={selectedAbc || "all"}
                onValueChange={(v) => onSelectedAbcChange(v === "all" ? "" : v)}
              >
                <SelectTrigger aria-label="ABC">
                  <SelectValue placeholder="ABC" />
                </SelectTrigger>
                <SelectContent>
                  {ABC_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id={sortByAbcSwitchId}
                checked={sortByAbc}
                onCheckedChange={onSortByAbcChange}
              />
              <Label
                htmlFor={sortByAbcSwitchId}
                className="text-sm font-medium cursor-pointer"
              >
                Сортувати по ABC
              </Label>
            </div>
          </div>
        </div>

        <div className="grid gap-2 w-full justify-center">
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
          className="justify-end w-full max-w-sm"
        />
      </div>
    </DialogContent>
  );
}
