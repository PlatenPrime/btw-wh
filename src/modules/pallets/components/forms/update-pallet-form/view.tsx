import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface UpdatePalletFormViewProps {
  title: string;
  setTitle: (value: string) => void;
  sector: string;
  setSector: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export function UpdatePalletFormView({
  title,
  setTitle,
  sector,
  setSector,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdatePalletFormViewProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Назва палети</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введіть назву палети"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Сектор</Label>
            <Input
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Введіть сектор (необов'язково)"
              disabled={isSubmitting}
            />
          </div>

          {error && <div className="text-destructive text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="flex-1"
            >
              {isSubmitting ? "Оновлюю..." : "Оновити"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="destructive"
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
