import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { usePalletsByRowQuery } from "../../api/usePalletsByRowQuery";
import { DeletePalletDialog } from "../delete-pallet-dialog";
import { PalletCard } from "../pallet-card";
import { PalletForm } from "../pallet-form";

interface PalletListProps {
  rowId: string;
  onAddPallet?: () => void;
}

export function PalletList({ rowId }: PalletListProps) {
  const { data, isLoading, error, refetch } = usePalletsByRowQuery(rowId);
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-muted-foreground">Завантаження паллет...</div>;
  if (error)
    return <div className="text-destructive">Помилка завантаження паллет</div>;
  if (!data || data.length === 0)
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-muted-foreground">Паллети не знайдено</div>
        <Button onClick={() => setCreateOpen(true)} variant="outline">
          Додати паллету
        </Button>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Створити паллету</DialogTitle>
            </DialogHeader>
            <PalletForm
              rowId={rowId}
              onSuccess={() => {
                setCreateOpen(false);
                refetch();
              }}
              onCancel={() => setCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    );

  return (
    <>
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setCreateOpen(true)} variant="outline">
          Додати паллету
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((pallet) => (
          <div key={pallet._id} className="group relative">
            <PalletCard
              pallet={pallet}
              onClick={() => navigate(`/pallet/${pallet._id}`)}
            />
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <DeletePalletDialog
                pallet={pallet}
                rowId={rowId}
                trigger={
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                  >
                    ✕
                  </Button>
                }
                onSuccess={refetch}
              />
            </div>
          </div>
        ))}
      </div>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити паллету</DialogTitle>
          </DialogHeader>
          <PalletForm
            rowId={rowId}
            onSuccess={() => {
              setCreateOpen(false);
              refetch();
            }}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
