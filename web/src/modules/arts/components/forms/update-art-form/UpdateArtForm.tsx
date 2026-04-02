import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { FormErrorDisplay } from "@/components/shared/error-components";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePatchArtMutation } from "@/modules/arts/api/hooks/mutations/usePatchArtMutation";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { updateArtSchema, type UpdateArtFormData } from "./schema";

/** Значення Select для порожнього prodName (скидання в БД) */
const CLEAR_PROD_SELECT_VALUE = "__clear__";

interface UpdateArtFormProps {
  artData: ArtDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateArtForm({
  artData,
  onSuccess,
  onCancel,
}: UpdateArtFormProps) {
  const form = useForm<UpdateArtFormData>({
    resolver: zodResolver(updateArtSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      limit: artData.limit ?? 0,
      prodName: artData.prodName ?? "",
    },
  });

  const prodsQuery = useProdsQuery();
  const prods = prodsQuery.data?.data ?? [];

  const patchMutation = usePatchArtMutation({
    artikul: artData.artikul,
  });
  const isSubmitting = patchMutation.isPending;

  const onSubmit = async (data: UpdateArtFormData) => {
    try {
      await patchMutation.mutateAsync({
        id: artData._id,
        data: { limit: data.limit, prodName: data.prodName },
      });
      onSuccess();
    } catch (error) {
      console.error("Помилка оновлення артикула:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка оновлення артикула",
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
  const prodNameField = watch("prodName");

  const hasOrphanProdName = useMemo(() => {
    const name = artData.prodName;
    if (!name) return false;
    return !prods.some((p) => p.name === name);
  }, [artData.prodName, prods]);

  const selectProdValue = prodNameField
    ? prodNameField
    : CLEAR_PROD_SELECT_VALUE;

  const prodSelectDisabled =
    isSubmitting || prodsQuery.isLoading || prodsQuery.isError;

  const handleLimitChange = (value: string) => {
    setValue("limit", value === "" ? 0 : Number(value), {
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
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

      <div className="grid gap-2">
        <Label htmlFor="art-prod-name">Виробник</Label>
        <Select
          value={selectProdValue}
          onValueChange={(v) =>
            setValue("prodName", v === CLEAR_PROD_SELECT_VALUE ? "" : v, {
              shouldValidate: true,
            })
          }
          disabled={prodSelectDisabled}
        >
          <SelectTrigger
            id="art-prod-name"
            className={errors.prodName ? "border-destructive" : ""}
          >
            <SelectValue
              placeholder={
                prodsQuery.isLoading
                  ? "Завантаження..."
                  : prodsQuery.isError
                    ? "Не вдалося завантажити довідник"
                    : "Оберіть виробника"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CLEAR_PROD_SELECT_VALUE}>
              Без виробника (скинути)
            </SelectItem>
            {hasOrphanProdName && artData.prodName ? (
              <SelectItem value={artData.prodName}>
                {`${artData.prodName} (немає в довіднику)`}
              </SelectItem>
            ) : null}
            {prods.map((p) => (
              <SelectItem key={p._id} value={p.name}>
                <EntityLabel
                  imageUrl={p.imageUrl}
                  title={p.title}
                  fallbackLabel={p.name}
                  imageSize="xs"
                />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {prodsQuery.isError && (
          <p className="text-destructive text-xs">
            Список виробників недоступний. Спробуйте пізніше.
          </p>
        )}
        {errors.prodName && (
          <p className="text-destructive text-xs">{errors.prodName.message}</p>
        )}
      </div>

      {errors.root && (
        <FormErrorDisplay error={errors.root.message} variant="compact" />
      )}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        cancelText="Скасувати"
        submitText="Зберегти"
        isSubmitting={isSubmitting}
        className="w-full"
      />
    </form>
  );
}
