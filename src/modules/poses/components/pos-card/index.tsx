import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { IPos } from "../../types";
import { PosForm } from "../pos-form";

interface PosCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosCard({ pos, onSuccess }: PosCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="truncate text-lg font-semibold">{pos.artikul}</h3>
        <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
          Редагувати
        </Button>
      </div>
      <div className="text-muted-foreground mb-1 text-sm">
        Кількість: <span className="font-medium">{pos.quant}</span>
      </div>
      <div className="text-muted-foreground mb-1 text-sm">
        Коробок: <span className="font-medium">{pos.boxes}</span>
      </div>
      <div className="text-muted-foreground mb-1 text-sm">
        Склад: <span className="font-medium">{pos.sklad || "—"}</span>
      </div>
      <div className="text-muted-foreground mb-1 text-sm">
        Дата: <span className="font-medium">{pos.date || "—"}</span>
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редагувати позицію</DialogTitle>
          </DialogHeader>
          <PosForm
            pos={pos}
            palletId={pos.pallet}
            rowId={pos.row}
            onSuccess={() => {
              setEditOpen(false);
              onSuccess?.();
            }}
            onCancel={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
