import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePalletMutation } from "@/modules/pallets/api/hooks/mutations/useUpdatePalletMutation";
import type { PalletShortDto, UpdatePalletDto } from "@/modules/pallets/api/types";
import { palletSchema, type PalletFormValues } from "@/modules/pallets/components/forms/schema";
import { UpdatePalletFormView } from "./UpdatePalletFormView";

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
  const form = useForm<PalletFormValues>({
    resolver: zodResolver(palletSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: pallet.title,
      sector: pallet.sector || "",
      isDef: pallet.isDef,
    },
  });

  const updateMutation = useUpdatePalletMutation(rowId);
  const isSubmitting = updateMutation.isPending;

  const onSubmit = async (data: PalletFormValues) => {
    try {
      const updateData: UpdatePalletDto = {
        title: data.title.trim(),
        sector: data.sector?.trim() || undefined,
        isDef: data.isDef,
      };
      await updateMutation.mutateAsync({ id: pallet._id, data: updateData });
      onSuccess();
    } catch (error) {
      console.error("Помилка збереження палети:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка збереження палети",
      });
    }
  };

  return (
    <UpdatePalletFormView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

