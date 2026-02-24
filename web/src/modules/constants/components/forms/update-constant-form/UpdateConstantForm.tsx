import { useUpdateConstantMutation } from "@/modules/constants/api/hooks/mutations/useUpdateConstantMutation";
import type { ConstantDto } from "@/modules/constants/api/types";
import {
  recordToDataEntries,
  updateConstantDefaultValues,
  updateConstantSchema,
  dataEntriesToRecord,
  type UpdateConstantFormValues,
} from "@/modules/constants/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateConstantFormView } from "./UpdateConstantFormView";

interface UpdateConstantFormProps {
  constant: ConstantDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateConstantForm({
  constant,
  onSuccess,
  onCancel,
}: UpdateConstantFormProps) {
  const form = useForm<UpdateConstantFormValues>({
    resolver: zodResolver(updateConstantSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: updateConstantDefaultValues,
  });

  const mutation = useUpdateConstantMutation();

  useEffect(() => {
    form.reset({
      name: constant.name,
      title: constant.title,
      dataEntries: recordToDataEntries(constant.data ?? {}),
    });
  }, [constant, form]);

  const onSubmit = async (data: UpdateConstantFormValues) => {
    try {
      const payload: { name?: string; title?: string; data?: Record<string, string> } = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.title !== undefined) payload.title = data.title;
      if (data.dataEntries !== undefined)
        payload.data = dataEntriesToRecord(data.dataEntries);
      await mutation.mutateAsync({ id: constant._id, data: payload });
      onSuccess?.();
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка оновлення константи",
      });
    }
  };

  return (
    <UpdateConstantFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
