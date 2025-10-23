import { useCreateZoneMutation } from "@/modules/zones/api/hooks/mutations/useCreateZoneMutation";
import {
  createZoneDefaultValues,
  createZoneSchema,
  type CreateZoneFormValues,
} from "@/modules/zones/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateZoneFormView } from "./CreateZoneFormView";

interface CreateZoneFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateZoneForm({ onSuccess, onCancel }: CreateZoneFormProps) {
  const form = useForm<CreateZoneFormValues>({
    resolver: zodResolver(createZoneSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createZoneDefaultValues,
  });

  const mutation = useCreateZoneMutation();

  const onSubmit = async (data: CreateZoneFormValues) => {
    try {
      await mutation.mutateAsync(data);
      onSuccess?.();
      form.reset();
    } catch (error) {
      // Ошибка уже обработана в mutation
    }
  };

  return (
    <CreateZoneFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
