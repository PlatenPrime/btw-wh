import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePosesByPalletQuery } from "../../api/usePosesByPalletQuery";
import { DeletePosDialog } from "../delete-pos-dialog";
import { PosCard } from "../pos-card";
import { PosForm } from "../pos-form";

interface PosListProps {
  palletId: string;
  rowId?: string;
  onSuccess?: () => void;
}

export function PosList({ palletId, rowId, onSuccess }: PosListProps) {
  const { data, isLoading, error, refetch } = usePosesByPalletQuery(palletId);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered =
    data?.filter(
      (pos) =>
        pos.artikul.toLowerCase().includes(search.toLowerCase()) ||
        (pos.comment &&
          pos.comment.toLowerCase().includes(search.toLowerCase())),
    ) ?? [];

  if (isLoading)
    return <div className="text-muted-foreground">Завантаження позицій...</div>;
  if (error)
    return <div className="text-destructive">Помилка завантаження позицій</div>;
  if (!filtered.length)
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-muted-foreground">Позиції не знайдено</div>
        <Button onClick={() => setCreateOpen(true)} variant="outline">
          Додати позицію
        </Button>
        <Input
          placeholder="Пошук по артикулах або коментарю..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 w-full max-w-xs"
        />
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Створити позицію</DialogTitle>
            </DialogHeader>
            {rowId && (
              <PosForm
                palletId={palletId}
                rowId={rowId}
                onSuccess={() => {
                  setCreateOpen(false);
                  refetch();
                  onSuccess?.();
                }}
                onCancel={() => setCreateOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Input
          placeholder="Пошук по артикулах або коментарю..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs"
        />
        <Button onClick={() => setCreateOpen(true)} variant="outline">
          Додати позицію
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pos) => (
          <div key={pos._id} className="group relative flex items-start gap-2">
            <div className="flex-1">
              <PosCard
                pos={pos}
                onSuccess={() => {
                  refetch();
                  onSuccess?.();
                }}
              />
            </div>
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <DeletePosDialog
                pos={pos}
                palletId={palletId}
                trigger={
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                  >
                    ✕
                  </Button>
                }
                onSuccess={() => {
                  refetch();
                  onSuccess?.();
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити позицію</DialogTitle>
          </DialogHeader>
          {rowId && (
            <PosForm
              palletId={palletId}
              rowId={rowId}
              onSuccess={() => {
                setCreateOpen(false);
                refetch();
                onSuccess?.();
              }}
              onCancel={() => setCreateOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
