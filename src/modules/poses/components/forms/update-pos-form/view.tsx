import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface UpdatePosFormViewProps {
  artikul: string;
  quant: number;
  setQuant: (value: number) => void;
  boxes: number;
  setBoxes: (value: number) => void;
  sklad: string;
  setSklad: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export function UpdatePosFormView({
  artikul,
  quant,
  setQuant,
  boxes,
  setBoxes,
  sklad,
  setSklad,
  comment,
  setComment,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdatePosFormViewProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="artikul">Артикул {artikul}</Label>
      
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quant">Кількість</Label>
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

            <div className="space-y-2">
              <Label htmlFor="boxes">Коробки</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="sklad">Склад</Label>
            <Input
              id="sklad"
              value={sklad}
              onChange={(e) => setSklad(e.target.value)}
              placeholder="Назва складу"
              disabled={isSubmitting}
            />
          </div>



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

          {error && <div className="text-destructive text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || !artikul.trim()}
              className="flex-1"
            >
              {isSubmitting ? "Оновлюю..." : "Оновити"}
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
