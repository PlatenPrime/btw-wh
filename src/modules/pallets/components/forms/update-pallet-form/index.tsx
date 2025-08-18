import { useUpdatePalletMutation } from "@/modules/pallets/api/hooks/useUpdatePalletMutation";
import type { UpdatePalletDto } from "@/modules/pallets/api/types";
import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { UpdatePalletFormView } from "./view";

interface UpdatePalletFormProps {
  pallet: PalletShortDto;
  rowId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdatePalletForm({
  pallet,
  rowId,
  onSuccess,
  onCancel,
}: UpdatePalletFormProps) {
  const [title, setTitle] = useState(pallet.title);
  const [sector, setSector] = useState(pallet.sector || "");
  const [error, setError] = useState<string | null>(null);

  const updateMutation = useUpdatePalletMutation(rowId);
  const isSubmitting = updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const updateData: UpdatePalletDto = {
        title: title.trim(),
        sector: sector.trim() || undefined,
      };
      await updateMutation.mutateAsync({ id: pallet._id, data: updateData });
      onSuccess();
    } catch (error) {
      console.error("Помилка збереження палети:", error);
      setError(
        error instanceof Error ? error.message : "Помилка збереження палети",
      );
    }
  };

  return (
    <UpdatePalletFormView
      title={title}
      setTitle={setTitle}
      sector={sector}
      setSector={setSector}
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
