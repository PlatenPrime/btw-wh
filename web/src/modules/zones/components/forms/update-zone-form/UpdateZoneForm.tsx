import { useUpdateZoneMutation } from "@/modules/zones/api/hooks/mutations/useUpdateZoneMutation";
import type { ZoneDto } from "@/modules/zones/api/types";
import {
  updateZoneDefaultValues,
  updateZoneSchema,
  type UpdateZoneFormValues,
} from "@/modules/zones/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateZoneFormView } from "./UpdateZoneFormView";

interface UpdateZoneFormProps {
  zone: ZoneDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateZoneForm({
  zone,
  onSuccess,
  onCancel,
}: UpdateZoneFormProps) {
  const form = useForm<UpdateZoneFormValues>({
    resolver: zodResolver(updateZoneSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: updateZoneDefaultValues,
  });

  const mutation = useUpdateZoneMutation();

  // Заполняем форму данными зоны
  useEffect(() => {
    form.reset({
      title: zone.title,
      bar: zone.bar,
      sector: zone.sector,
    });
  }, [zone, form]);

  const onSubmit = async (data: UpdateZoneFormValues) => {
    try {
      await mutation.mutateAsync({ id: zone._id, data });
      onSuccess?.();
    } catch (error) {
      console.error("Помилка збереження зони:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка збереження зони",
      });
    }
  };

  return (
    <UpdateZoneFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
