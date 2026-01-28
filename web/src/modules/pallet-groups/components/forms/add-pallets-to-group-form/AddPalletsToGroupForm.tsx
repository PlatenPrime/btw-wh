import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useSetPalletsForGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useSetPalletsForGroupMutation";
import { usePalletGroupQuery } from "@/modules/pallet-groups/api/hooks/queries/usePalletGroupQuery";
import type { PalletShortDto as GroupPalletShortDto } from "@/modules/pallet-groups/api/types";
import { usePalletsWithoutGroupQuery } from "@/modules/pallets/api/hooks/queries/usePalletsWithoutGroupQuery";
import type { PalletListResponse } from "@/modules/pallets/api/types";
import { useMemo, useState } from "react";

interface AddPalletsToGroupFormProps {
  groupId: string;
  enabled: boolean;
  onClose: () => void;
}

export function AddPalletsToGroupForm({
  groupId,
  enabled,
  onClose,
}: AddPalletsToGroupFormProps) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const groupQuery = usePalletGroupQuery({ id: groupId, enabled });
  const palletsQuery = usePalletsWithoutGroupQuery(enabled);
  const setPalletsMutation = useSetPalletsForGroupMutation();

  const ungroupedPallets: PalletListResponse = palletsQuery.data ?? [];

  const filteredPallets = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return ungroupedPallets;
    return ungroupedPallets.filter((p) => p.title.toLowerCase().includes(term));
  }, [search, ungroupedPallets]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredPallets.map((p) => p._id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleSubmit = async () => {
    if (!groupQuery.data?.data || selectedIds.length === 0) {
      onClose();
      return;
    }

    const current = groupQuery.data.data.pallets ?? [];
    const currentIds = current.map((p: GroupPalletShortDto) => p.id);

    const combined = [...currentIds];
    for (const id of selectedIds) {
      if (!combined.includes(id)) {
        combined.push(id);
      }
    }

    await setPalletsMutation.mutateAsync({
      groupId,
      palletIds: combined,
    });

    onClose();
  };

  const isLoading = groupQuery.isLoading || palletsQuery.isLoading;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Пошук палет за назвою..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            disabled={filteredPallets.length === 0}
          >
            Обрати всі
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearSelection}
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
              const checked = selectedIds.includes(pallet._id);
              return (
                <li
                  key={pallet._id}
                  className="flex items-center justify-between gap-2 rounded-md border px-2 py-1 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleSelection(pallet._id)}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{pallet.title}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {pallet.sector ?? "sector: 0"}
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Скасувати
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={selectedIds.length === 0 || setPalletsMutation.isPending}
        >
          {setPalletsMutation.isPending
            ? "Додавання..."
            : `Додати (${selectedIds.length})`}
        </Button>
      </div>
    </div>
  );
}
