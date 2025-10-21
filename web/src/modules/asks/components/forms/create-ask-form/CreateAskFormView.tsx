import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";
import { useFormContext } from "react-hook-form";
import type { CreateAskFormData } from "./schema";

interface CreateAskFormViewProps {
  form: ReturnType<typeof useFormContext<CreateAskFormData>>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  onQuantChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  onSubmit: (data: CreateAskFormData) => void;
  onCancel?: () => void;
  isArtikulPreFilled?: boolean; // Флаг для предзаполненного артикула
}

export function CreateAskFormView({
  form,
  artikul,
  onArtikulChange,
  onQuantChange,
  isSubmitting,
  isArtLoading,
  artData,
  onSubmit,
  onCancel,
  isArtikulPreFilled = false,
}: CreateAskFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Информация об артикуле */}
          {artData && (
            <div className="bg-muted/50 rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <ArtImage artikul={artikul} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{artData.nameukr}</p>
                  <p className="text-muted-foreground text-xs">{artikul}</p>
                </div>
              </div>
            </div>
          )}

          {/* Предупреждение о том, что артикул не найден */}
          {artikul.length === 9 && !isArtLoading && !artData && (
            <div className="rounded-lg border bg-yellow-50 p-3 dark:bg-yellow-950/20">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                ⚠️ Такого артикула в базі ЩЕ НЕМАЄ
              </p>
            </div>
          )}

          {/* Поле артикула */}
          <div className="space-y-2">
            <Label htmlFor="artikul">Артикул *</Label>
            <Input
              id="artikul"
              type="text"
              {...register("artikul")}
              onChange={(e) => onArtikulChange(e.target.value)}
              placeholder="1111-1111"
              disabled={isSubmitting || isArtikulPreFilled}
              maxLength={9}
              className={errors.artikul ? "border-destructive" : ""}
            />
            {errors.artikul && (
              <p className="text-destructive text-xs">
                {errors.artikul.message}
              </p>
            )}
            {isArtLoading && (
              <p className="text-muted-foreground text-xs">Пошук артикула...</p>
            )}
            {isArtikulPreFilled && (
              <p className="text-muted-foreground text-xs">
                Артикул вибрано зі сторінки товару
              </p>
            )}
          </div>

          {/* Поле количества */}
          <InputQuant
            id="quant"
            label="Кількість"
            placeholder="Введіть кількість"
            value={watchedValues.quant || ""}
            onValueChange={onQuantChange}
            error={errors.quant?.message}
            disabled={isSubmitting}
            className={errors.quant ? "border-destructive" : ""}
          />

          {/* Поле комментария */}
          <div className="space-y-2">
            <Label htmlFor="com">Коментар</Label>
            <Textarea
              id="com"
              {...register("com")}
              placeholder="Додаткові деталі..."
              disabled={isSubmitting}
              className={errors.com ? "border-destructive" : ""}
              rows={3}
            />
            {errors.com && (
              <p className="text-destructive text-xs">{errors.com.message}</p>
            )}
          </div>

          {/* Кнопки */}
          <DialogActions
            onCancel={onCancel}
            onSubmit={handleFormSubmit}
            cancelText="Скасувати"
            submitText="Створити"
            isSubmitting={isSubmitting}
            isDisabled={!artikul || artikul.length !== 9}
            className="w-full"
          />
        </form>
      </CardContent>
    </Card>
  );
}
