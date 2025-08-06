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
import { Textarea } from "@/components/ui/textarea";
import { sklads, type ISklads } from "@/constants/sklad";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImage } from "@/modules/arts/components/elements/art-image";
import type { IPos } from "@/modules/poses/api";

interface CreatePosFormViewProps {
  artikul: string;
  setArtikul: (value: string) => void;
  quant: number;
  setQuant: (value: number) => void;
  boxes: number;
  setBoxes: (value: number) => void;
  sklad: string;
  setSklad: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  existingPos?: IPos;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export function CreatePosFormView({
  artikul,
  setArtikul,
  quant,
  setQuant,
  boxes,
  setBoxes,
  sklad,
  setSklad,
  date,
  setDate,
  comment,
  setComment,
  error,
  isSubmitting,
  isArtLoading,
  artData,
  existingPos,
  onSubmit,
  onCancel,
}: CreatePosFormViewProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
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
              value={artikul}
              onChange={(e) => setArtikul(e.target.value)}
              placeholder="ЦЦЦЦ-ЦЦЦЦ"
              required
              disabled={isSubmitting}
              maxLength={9}
            />
            {isArtLoading && (
              <p className="text-muted-foreground text-xs">Пошук артикула...</p>
            )}
          </div>

          {/* Поле количества товара */}
          <div className="space-y-2">
            <Label htmlFor="quant">Кількість товару *</Label>
            <Input
              id="quant"
              type="number"
              value={quant}
              onChange={(e) => setQuant(Number(e.target.value))}
              placeholder="0"
              required
              disabled={isSubmitting}
              min="0"
            />
          </div>

          {/* Поле количества коробок */}
          <div className="space-y-2">
            <Label htmlFor="boxes">Кількість коробок *</Label>
            <Input
              id="boxes"
              type="number"
              value={boxes}
              onChange={(e) => setBoxes(Number(e.target.value))}
              placeholder="0"
              required
              disabled={isSubmitting}
              min="0"
            />
          </div>

          {/* Поле склада */}
          <div className="space-y-2">
            <Label htmlFor="sklad">Склад</Label>
            <Select value={sklad} onValueChange={setSklad}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={sklads[sklad as keyof ISklads]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pogrebi">{sklads.pogrebi}</SelectItem>
                <SelectItem value="merezhi">{sklads.merezhi}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Поле даты */}
          <div className="space-y-2">
            <Label htmlFor="date">Дата</Label>
            <Input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="MM.РР"
              disabled={isSubmitting}
            />
          </div>

          {/* Поле комментария */}
          <div className="space-y-2">
            <Label htmlFor="comment">Коментар</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Додатковий коментар"
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          {/* Уведомление о существующей позиции */}
          {existingPos && (
            <div className="rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Знайдено існуючу позицію з таким же артикулом. Кількість буде
                додана до існуючої позиції.
              </p>
            </div>
          )}

          {/* Ошибка */}
          {error && <div className="text-destructive text-sm">{error}</div>}

          {/* Кнопки */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={
                isSubmitting || !artikul.trim() || quant <= 0 || boxes <= 0
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
