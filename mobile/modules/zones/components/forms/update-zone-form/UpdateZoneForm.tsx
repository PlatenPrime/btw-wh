import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateZoneMutation } from "@/modules/zones/api/hooks/mutations/useUpdateZoneMutation";
import type { ZoneDto, UpdateZoneDto } from "@/modules/zones/api/types/dto";
import {
  updateZoneSchema,
  type UpdateZoneFormValues,
} from "@/modules/zones/components/forms/schema";
import { UpdateZoneFormView } from "./UpdateZoneFormView";

interface UpdateZoneFormProps {
  zone: ZoneDto;
  onSuccess: () => void;
  onCancel: () => void;
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
    defaultValues: {
      title: zone.title,
      bar: zone.bar,
      sector: zone.sector,
    },
  });

  const updateMutation = useUpdateZoneMutation();
  const isSubmitting = updateMutation.isPending;

  const onSubmit = async (data: UpdateZoneFormValues) => {
    try {
      const updateData: UpdateZoneDto = {};
      if (data.title !== undefined) {
        updateData.title = data.title.trim();
      }
      if (data.bar !== undefined) {
        updateData.bar = data.bar;
      }
      if (data.sector !== undefined) {
        updateData.sector = data.sector;
      }
      await updateMutation.mutateAsync({ zoneId: zone._id, data: updateData });
      onSuccess();
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
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

