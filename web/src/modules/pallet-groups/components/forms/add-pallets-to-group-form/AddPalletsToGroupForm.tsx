import { useSetPalletsForGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useSetPalletsForGroupMutation";
import { useFreePalletsQuery } from "@/modules/pallet-groups/api/hooks/queries/useFreePalletsQuery";
import { usePalletGroupQuery } from "@/modules/pallet-groups/api/hooks/queries/usePalletGroupQuery";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { useMemo, useState } from "react";
import { AddPalletsToGroupFormView } from "./AddPalletsToGroupFormView";

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
  const palletsQuery = useFreePalletsQuery({ enabled });
  const setPalletsMutation = useSetPalletsForGroupMutation();

  const filteredPallets = useMemo(() => {
    const ungroupedPallets: PalletShortDto[] =
      palletsQuery.data?.data ?? [];
    const term = search.trim().toLowerCase();
    if (!term) return ungroupedPallets;
    return ungroupedPallets.filter((p) => p.title.toLowerCase().includes(term));
  }, [search, palletsQuery.data?.data]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredPallets.map((p) => p.id));
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
    const currentIds = current.map((p: PalletShortDto) => p.id);

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
    <AddPalletsToGroupFormView
      search={search}
      onSearchChange={setSearch}
      filteredPallets={filteredPallets}
      selectedIds={selectedIds}
      onToggleSelection={toggleSelection}
      onSelectAll={handleSelectAll}
      onClearSelection={handleClearSelection}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={onClose}
      isSubmitting={setPalletsMutation.isPending}
      submitText={`Додати (${selectedIds.length})`}
      isSubmitDisabled={selectedIds.length === 0}
    />
  );
}
