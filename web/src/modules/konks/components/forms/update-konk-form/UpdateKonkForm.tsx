import { useUpdateKonkMutation } from "@/modules/konks/api/hooks/mutations/useUpdateKonkMutation";
import type { KonkDto } from "@/modules/konks/api/types";
import {
  updateKonkDefaultValues,
  updateKonkSchema,
  type UpdateKonkFormValues,
} from "@/modules/konks/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateKonkFormView } from "./UpdateKonkFormView";

interface UpdateKonkFormProps {
  konk: KonkDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const normalizeRecountDays = (recountDays: string[] | undefined): string[] => {
  if (!recountDays?.length) {
    return [];
  }

  return Array.from(new Set(recountDays));
};

export function UpdateKonkForm({
  konk,
  onSuccess,
  onCancel,
}: UpdateKonkFormProps) {
  const form = useForm<UpdateKonkFormValues>({
    resolver: zodResolver(updateKonkSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: updateKonkDefaultValues,
  });

  const mutation = useUpdateKonkMutation();
  const imageUrl = form.watch("imageUrl") ?? konk.imageUrl;

  useEffect(() => {
    form.reset({
      name: konk.name,
      title: konk.title,
      url: konk.url,
      imageUrl: konk.imageUrl,
      recountDays: normalizeRecountDays(konk.recountDays),
    });
  }, [konk, form]);

  const onSubmit = async (data: UpdateKonkFormValues) => {
    try {
      const payload: UpdateKonkFormValues = {
        ...data,
        recountDays: normalizeRecountDays(data.recountDays),
      };

      await mutation.mutateAsync({ id: konk._id, data: payload });
      onSuccess?.();
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка оновлення конкурента",
      });
    }
  };

  return (
    <UpdateKonkFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
      imagePreviewUrl={imageUrl || undefined}
    />
  );
}
