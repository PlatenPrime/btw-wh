import { useUpdatePalletMutation } from "@/modules/pallets/api/hooks/mutations/useUpdatePalletMutation";
import {
  palletSchema,
  type PalletFormValues,
} from "@/modules/pallets/components/forms/schema";
import type { PalletShortDto, UpdatePalletDto } from "@/modules/pallets/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseUpdatePalletDialogProps {
  pallet: PalletShortDto;
  rowId: string;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseUpdatePalletDialogReturn {
  form: ReturnType<typeof useForm<PalletFormValues>>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => Promise<void>;
  handleOpenChange: (newOpen: boolean) => void;
}

export function useUpdatePalletDialog({
  pallet,
  rowId,
  onOpenChange,
  onSuccess,
}: UseUpdatePalletDialogProps): UseUpdatePalletDialogReturn {
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

  const updatePalletMutation = useUpdatePalletMutation(rowId);

  const onSubmit = async (data: PalletFormValues) => {
    try {
      const updateData: UpdatePalletDto = {
        title: data.title.trim(),
        sector: data.sector?.trim() || undefined,
        isDef: data.isDef,
      };
      await updatePalletMutation.mutateAsync({ id: pallet._id, data: updateData });
      form.reset();
      onOpenChange?.(false);
      onSuccess?.();
    } catch (err: unknown) {
      let message = "Помилка збереження палети";
      if (err instanceof Error) {
        message = err.message;
      }
      form.setError("root", { message });
      throw err;
    }
  };

  const { reset } = form;

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset({
        title: pallet.title,
        sector: pallet.sector || "",
        isDef: pallet.isDef,
      });
    }
    onOpenChange?.(newOpen);
  };

  return {
    form,
    isSubmitting: updatePalletMutation.isPending,
    onSubmit,
    handleOpenChange,
  };
}

