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
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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
      return true;
    } catch (err: unknown) {
      let message = "Помилка створення палети";
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: unknown }).response === "object" &&
        (err as { response?: unknown }).response !== null
      ) {
        const response = (err as { response?: unknown }).response as Record<
          string,
          unknown
        >;
        if (
          "data" in response &&
          typeof response.data === "object" &&
          response.data !== null &&
          "message" in (response.data as Record<string, unknown>)
        ) {
          message = String((response.data as Record<string, unknown>).message);
        }
      }
      form.setError("root", { message });
      return false;
    }
  };

  const { handleSubmit, reset } = form;

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange?.(newOpen);
  };

  return {
    form,
    isSubmitting: createPalletMutation.isPending,
    onSubmit: handleFormSubmit,
    handleOpenChange,
  };
}

