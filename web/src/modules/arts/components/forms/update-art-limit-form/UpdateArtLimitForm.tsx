import { FormErrorDisplay } from "@/components/shared/error-components";
import { Button } from "@/components/ui/button";
import { InputQuant } from "@/components/ui/input-quant";
import { useUpdateArtLimitMutation } from "@/modules/arts/api/hooks/mutations/useUpdateArtLimitMutation";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateArtLimitSchema, type UpdateArtLimitFormData } from "./schema";

interface UpdateArtLimitFormProps {
  artData: ArtDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateArtLimitForm({
  artData,
  onSuccess,
  onCancel,
}: UpdateArtLimitFormProps) {
  const form = useForm<UpdateArtLimitFormData>({
    resolver: zodResolver(updateArtLimitSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      limit: artData.limit || 0,
    },
  });

  const updateMutation = useUpdateArtLimitMutation({
    artikul: artData.artikul as unknown as Pick<ArtDto, "artikul">,
  });
  const isSubmitting = updateMutation.isPending;

  const onSubmit = async (data: UpdateArtLimitFormData) => {
    try {
      await updateMutation.mutateAsync({
        id: artData._id,
        data: { limit: data.limit },
      });
      onSuccess();
    } catch (error) {
      console.error("Помилка оновлення ліміту:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка оновлення ліміту",
      });
    }
  };

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const limitValue = watch("limit");

  const handleLimitChange = (value: string) => {
    setValue("limit", value === "" ? 0 : Number(value), {
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <InputQuant
        id="art-limit"
        label="Ліміт артикулу *"
        placeholder="Введіть ліміт"
        value={limitValue === 0 ? "" : limitValue.toString()}
        onValueChange={handleLimitChange}
        error={errors.limit?.message}
        autoFocus
        disabled={isSubmitting}
      />

      {errors.root && (
        <FormErrorDisplay error={errors.root.message} variant="compact" />
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Збереження..." : "Зберегти"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}
