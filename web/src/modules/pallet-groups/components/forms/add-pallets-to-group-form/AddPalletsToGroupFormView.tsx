import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";

interface AddPalletsToGroupFormViewProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredPallets: PalletShortDto[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitText: string;
  isSubmitDisabled: boolean;
}

export function AddPalletsToGroupFormView({
  search,
  onSearchChange,
  filteredPallets,
  selectedIds,
  onToggleSelection,
  onSelectAll,
  onClearSelection,
  isLoading,
  onSubmit,
  onCancel,
  isSubmitting,
  submitText,
  isSubmitDisabled,
}: AddPalletsToGroupFormViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Пошук палет за назвою..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            disabled={filteredPallets.length === 0}
          >
            Обрати всі
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            disabled={selectedIds.length === 0}
          >
            Очистити вибір
          </Button>
        </div>
      </div>

      <div className="h-72 overflow-auto rounded-md border">
        {isLoading ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            Завантаження палет...
          </div>
        ) : filteredPallets.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center p-4 text-center text-sm">
            Немає палет без групи, що відповідають фільтру
          </div>
        ) : (
          <ul className="grid gap-1 p-2">
            {filteredPallets.map((pallet) => {
              const checked = selectedIds.includes(pallet.id);
              return (
                <li
                  key={pallet.id}
                  className="flex items-center justify-between gap-2 rounded-md border px-2 py-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => onToggleSelection(pallet.id)}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{pallet.title}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {pallet.sector}
                      </span>
                    </div>
                  </div>
                  <div className="text-muted-foreground flex flex-col items-end text-[10px]">
                    <span>
                      Пуста: {(pallet.isEmpty ?? false) ? "Так" : "Ні"}
                    </span>
                    <span>Дефіцитна: {pallet.isDef ? "Так" : "Ні"}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <DialogActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelText="Скасувати"
        submitText={submitText}
        isSubmitting={isSubmitting}
        isDisabled={isSubmitDisabled}
        variant="success"
      />
    </div>
  );
}
