import { useCreateConstantMutation } from "@/modules/constants/api/hooks/mutations/useCreateConstantMutation";
import {
  createConstantDefaultValues,
  createConstantSchema,
  dataEntriesToRecord,
  type CreateConstantFormValues,
} from "@/modules/constants/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateConstantFormView } from "./CreateConstantFormView";

interface CreateConstantFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateConstantForm({
  onSuccess,
  onCancel,
}: CreateConstantFormProps) {
  const form = useForm<CreateConstantFormValues>({
    resolver: zodResolver(createConstantSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createConstantDefaultValues,
  });

  const mutation = useCreateConstantMutation();

  const onSubmit = async (data: CreateConstantFormValues) => {
    try {
      await mutation.mutateAsync({
        name: data.name,
        title: data.title,
        data: dataEntriesToRecord(data.dataEntries ?? []),
      });
      onSuccess?.();
      form.reset(createConstantDefaultValues);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка створення константи",
      });
    }
  };

  return (
    <CreateConstantFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
