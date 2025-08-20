import { useCreatePalletMutation } from "@/modules/pallets/api/hooks";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { palletSchema, type PalletFormValues } from "../../forms/schema";
import { CreatePalletDialogView } from "./CreatePalletDialogView";
import { useState } from "react";



export function CreatePalletDialog({ row }: { row: RowDto }) {
  const form = useForm<PalletFormValues>({
    resolver: zodResolver(palletSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      sector: "",
    },
  });

  const [open, setOpen] = useState(false);

  const createPalletMutation = useCreatePalletMutation(row._id, row.title);

  const onSubmit = async (data: PalletFormValues) => {
    try {
      await createPalletMutation.mutateAsync({
        title: data.title.trim(),
        rowData: { _id: row._id, title: row.title },
        sector: data.sector?.trim() || undefined,
      });
      // Reset form and close dialog after successful submission
      form.reset();
      return true; // Signal success to close dialog
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
      return false; // Signal failure to keep dialog open
    }
  };

  const {
    handleSubmit,
    reset,
  } = form;

  const handleFormSubmit = handleSubmit(async (data) => {
    const success = await onSubmit(data);
    if (success) {
      setOpen(false);
      reset();
    }
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    setOpen(newOpen);
  };

  return (
    <CreatePalletDialogView
      open={open}
      form={form}
      isSubmitting={createPalletMutation.isPending}
      onSubmit={handleFormSubmit}
      onOpenChange={handleOpenChange}
    />
  );
}
