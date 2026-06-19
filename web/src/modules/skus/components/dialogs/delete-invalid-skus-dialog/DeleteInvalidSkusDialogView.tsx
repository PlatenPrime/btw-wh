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

interface DeleteInvalidSkusDialogViewProps {
  konks: KonkDto[];
  selectedKonkOrAll: string;
  onSelectedKonkOrAllChange: (value: string) => void;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteInvalidSkusDialogView({
  konks,
  selectedKonkOrAll,
  onSelectedKonkOrAllChange,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteInvalidSkusDialogViewProps) {
  const isKonkOk = Boolean(selectedKonkOrAll);
  const isAllKonks = selectedKonkOrAll === SKUS_EXCEL_ALL_KONKS_VALUE;
  const oneKonk = konks.find((k) => k.name === selectedKonkOrAll);
  const oneKonkLabel =
    (oneKonk?.title ?? oneKonk?.name ?? selectedKonkOrAll) || "";

  return (
    <DialogContent className="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle>Видалити невалідні SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Оберіть конкурента або «усі конкуренти». Після підтвердження буде
          видалено відповідні записи з позначкою невалідності (
          <code className="text-xs">isInvalid: true</code>). Інші SKU не
          зміняться. Цю дію неможливо скасувати.
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
        {isKonkOk ? (
          <p className={typography.pageDescription}>
            {isAllKonks ? (
              <>
                Буде видалено <strong>усі</strong> невалідні SKU{" "}
                <strong>у всіх конкурентів</strong>.
              </>
            ) : (
              <>
                Буде видалено <strong>усі</strong> невалідні SKU конкурента{" "}
                <strong>{oneKonkLabel}</strong>.
              </>
            )}
          </p>
        ) : null}
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити невалідні"
          submitLoadingText="Видалення..."
          isDisabled={!isKonkOk}
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
