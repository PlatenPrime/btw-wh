import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateZoneMutation } from "@/modules/zones/api/hooks/mutations/useCreateZoneMutation";
import type { CreateZoneDto } from "@/modules/zones/api/types/dto";
import {
  createZoneSchema,
  createZoneDefaultValues,
  type CreateZoneFormValues,
} from "@/modules/zones/components/forms/schema";
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

  const createMutation = useCreateZoneMutation();
  const isSubmitting = createMutation.isPending;

  const onSubmit = async (data: CreateZoneFormValues) => {
    try {
      const createData: CreateZoneDto = {
        title: data.title.trim(),
        bar: data.bar,
        sector: data.sector,
      };
      await createMutation.mutateAsync(createData);
      onSuccess?.();
      form.reset();
    } catch (error) {
      console.error("Помилка створення зони:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка створення зони",
      });
    }
  };

  return (
    <CreateZoneFormView
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

