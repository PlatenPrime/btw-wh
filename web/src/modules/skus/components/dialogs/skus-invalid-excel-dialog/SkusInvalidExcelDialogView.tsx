import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import { SKUS_EXCEL_ALL_KONKS_VALUE } from "@/modules/skus/components/dialogs/skus-excel-konk-scope";
import { typography } from "@/lib/typography";

interface SkusInvalidExcelDialogViewProps {
  konks: KonkDto[];
  selectedKonkOrAll: string;
  onSelectedKonkOrAllChange: (value: string) => void;
  isDownloading: boolean;
  onDownload: () => void;
  onCancel: () => void;
}

export function SkusInvalidExcelDialogView({
  konks,
  selectedKonkOrAll,
  onSelectedKonkOrAllChange,
  isDownloading,
  onDownload,
  onCancel,
}: SkusInvalidExcelDialogViewProps) {
  const isKonkOk = Boolean(selectedKonkOrAll);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Excel невалідних SKU</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className={typography.pageDescription}>
          Оберіть конкурента або «усі конкуренти». У файл потрапляють SKU з
          позначкою невалідності згідно з правилами модуля.
        </p>
        <div className="grid gap-2">
          <p className={typography.formLabel}>Конкурент</p>
          <Select
            value={selectedKonkOrAll || "placeholder"}
            onValueChange={(v) =>
              onSelectedKonkOrAllChange(v === "placeholder" ? "" : v)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Оберіть конкурента" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder" disabled>
                Оберіть конкурента
              </SelectItem>
              <SelectItem value={SKUS_EXCEL_ALL_KONKS_VALUE}>
                Усі конкуренти
              </SelectItem>
              {konks.map((k) => (
                <SelectItem key={k._id} value={k.name}>
                  <EntityLabel
                    imageUrl={k.imageUrl}
                    title={k.title}
                    fallbackLabel={k.name}
                    imageSize="xs"
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDownload}
          isSubmitting={isDownloading}
          submitText="Скачати"
          submitLoadingText="Завантаження..."
          isDisabled={!isKonkOk}
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
