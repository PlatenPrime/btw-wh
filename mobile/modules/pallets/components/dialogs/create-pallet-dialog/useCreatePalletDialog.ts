import { useCreatePalletMutation } from "@/modules/pallets/api/hooks/mutations/useCreatePalletMutation";
import {
  palletSchema,
  type PalletFormValues,
} from "@/modules/pallets/components/forms/schema";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseCreatePalletDialogProps {
  row: RowDto;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

interface UseCreatePalletDialogReturn {
  form: ReturnType<typeof useForm<PalletFormValues>>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => Promise<void>;
  handleOpenChange: (newOpen: boolean) => void;
}

export function useCreatePalletDialog({
  row,
  onOpenChange,
  onSuccess,
}: UseCreatePalletDialogProps): UseCreatePalletDialogReturn {
  const form = useForm<PalletFormValues>({
    resolver: zodResolver(palletSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      sector: "",
      isDef: false,
    },
  });

  const createPalletMutation = useCreatePalletMutation(row._id, row.title);

  const onSubmit = async (data: PalletFormValues) => {
    try {
      await createPalletMutation.mutateAsync({
        title: data.title.trim(),
        rowData: { _id: row._id, title: row.title },
        sector: data.sector?.trim() || undefined,
        isDef: data.isDef,
      });
      form.reset();
      onOpenChange?.(false);
      onSuccess?.();
    } catch (err: unknown) {
      let message = "Помилка створення палети";
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
      reset();
    }
    onOpenChange?.(newOpen);
  };

  return {
    form,
    isSubmitting: createPalletMutation.isPending,
    onSubmit,
    handleOpenChange,
  };
}
