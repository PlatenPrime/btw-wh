import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sklads, type ISklads } from "@/constants/sklad";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image";
import type { IPos } from "@/modules/poses/api";
import { useFormContext } from "react-hook-form";
import type { CreatePosFormData } from "./schema";

interface CreatePosFormViewProps {
  form: ReturnType<typeof useFormContext<CreatePosFormData>>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  onQuantChange: (value: string) => void;
  onBoxesChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  existingPos?: IPos;
  onSubmit: (data: CreatePosFormData) => void;
  onCancel?: () => void;
}

export function CreatePosFormView({
  form,
  artikul,
  onArtikulChange,
  onQuantChange,
  onBoxesChange,
  isSubmitting,
  isArtLoading,
  artData,
  existingPos,
  onSubmit,
  onCancel,
}: CreatePosFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

          {/* Поле артикула */}
          <div className="space-y-2">
            <Label htmlFor="artikul">Артикул *</Label>
            <Input
              id="artikul"
              type="text"
              {...register("artikul")}
              onChange={(e) => onArtikulChange(e.target.value)}
              placeholder="1111-1111"
              disabled={isSubmitting}
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
          </div>

          {/* Поле количества товара */}
          <div className="space-y-2">
            <Label htmlFor="quant">Кількість товару *</Label>
            <Input
              id="quant"
              type="text"
              value={
                watchedValues.quant === 0 ? "" : watchedValues.quant.toString()
              }
              onChange={(e) => onQuantChange(e.target.value)}
              placeholder="0"
              disabled={isSubmitting}
              className={errors.quant ? "border-destructive" : ""}
            />
            {errors.quant && (
              <p className="text-destructive text-xs">{errors.quant.message}</p>
            )}
          </div>

          {/* Поле количества коробок */}
          <div className="space-y-2">
            <Label htmlFor="boxes">Кількість коробок *</Label>
            <Input
              id="boxes"
              type="text"
              value={
                watchedValues.boxes === 0 ? "" : watchedValues.boxes.toString()
              }
              onChange={(e) => onBoxesChange(e.target.value)}
              placeholder="0"
              disabled={isSubmitting}
              className={errors.boxes ? "border-destructive" : ""}
            />
            {errors.boxes && (
              <p className="text-destructive text-xs">{errors.boxes.message}</p>
            )}
          </div>

          {/* Поле склада */}
          <div className="space-y-2">
            <Label htmlFor="sklad">Склад</Label>
            <Select
              value={watchedValues.sklad}
              onValueChange={(value) =>
                setValue("sklad", value, { shouldValidate: true })
              }
            >
              <SelectTrigger
                className={`w-full ${errors.sklad ? "border-destructive" : ""}`}
              >
                <SelectValue
                  placeholder={sklads[watchedValues.sklad as keyof ISklads]}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pogrebi">{sklads.pogrebi}</SelectItem>
                <SelectItem value="merezhi">{sklads.merezhi}</SelectItem>
              </SelectContent>
            </Select>
            {errors.sklad && (
              <p className="text-destructive text-xs">{errors.sklad.message}</p>
            )}
          </div>

         

          {/* Уведомление о существующей позиции */}
          {existingPos && (
            <div className="rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Такий артикул вже є на палеті. При повній відповідності
                кількість буде об'єднана
              </p>
            </div>
          )}

          {/* Кнопки */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !artikul.trim() ||
                watchedValues.quant <= 0 ||
                watchedValues.boxes <= 0
              }
              className="flex-1"
            >
              {isSubmitting ? "Створюю..." : "Створити"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Скасувати
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
