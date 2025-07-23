import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateRowMutation } from "@/modules/rows/api/hooks/useUpdateRowMutation";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";

interface UpdateRowFormProps {
  row: RowDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateRowForm({ row, onSuccess, onCancel }: UpdateRowFormProps) {
  const [title, setTitle] = useState(row.title);
  const [error, setError] = useState<string | null>(null);

  const updateMutation = useUpdateRowMutation();
  const isSubmitting = updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const updateData: UpdateRowDto = { title: title.trim() };
      await updateMutation.mutateAsync({ rowId: row._id, data: updateData });
      onSuccess();
    } catch (error) {
      console.error("Помилка збереження ряду:", error);
      setError(
        error instanceof Error ? error.message : "Помилка збереження ряду:",
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
