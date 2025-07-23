import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateRowMutation } from "@/modules/rows/api/hooks/useCreateRowMutation";

import { useState } from "react";
import type { CreateRowDto } from "@/modules/rows/api/types/dto";

interface CreateRowFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateRowForm({ onSuccess, onCancel }: CreateRowFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateRowMutation();

  const isSubmitting = createMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const createData: CreateRowDto = { title: title.trim() };
      await createMutation.mutateAsync(createData);

      onSuccess?.();
    } catch (error) {
      console.error("Помилка створення ряду:", error);
      setError(
        error instanceof Error ? error.message : "Помилка створення ряду:",
      );
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Назва ряду</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="XX-XX"
              required
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
              {isSubmitting ? "Створюю..." : "Створити"}
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
