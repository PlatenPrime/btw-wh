import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PalletList } from "@/modules/pallets/components/pallet-list";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
// --- добавлено для диалога и формы ---
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreatePalletMutation } from "@/modules/pallets/api/hooks";
import * as React from "react";

interface ViewProps {
  row: RowDto;
}

export function RowDetailView({ row }: ViewProps) {
  const navigate = useNavigate();
  // --- состояние для формы ---
  const [title, setTitle] = React.useState("");
  const [sector, setSector] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const createPalletMutation = useCreatePalletMutation(row._id, row.title);

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim()) {
      setFormError("Назва палети обов'язкова");
      return;
    }
    createPalletMutation.mutate(
      {
        title: title.trim(),
        rowData: { _id: row._id, title: row.title },
        sector: sector.trim() || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setSector("");
        },
        onError: (err: unknown) => {
          let message = "Помилка створення палети";
          if (
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof (err as { response?: unknown }).response === "object" &&
            (err as { response?: unknown }).response !== null
          ) {
            const response = (err as { response?: unknown }).response as Record<
              string,
              unknown
            >;
            if (
              "data" in response &&
              typeof response.data === "object" &&
              response.data !== null &&
              "message" in (response.data as Record<string, unknown>)
            ) {
              message = String(
                (response.data as Record<string, unknown>).message,
              );
            }
          }
          setFormError(message);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-foreground text-3xl font-bold">{row.title}</h1>
          </div>
        </div>

        <div className="flex gap-3">
          {/* --- Диалог добавления паллеты --- */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Додати палету
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Додати палету</DialogTitle>
                <DialogDescription>
                  Введіть назву та (опціонально) сектор для нової палети
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="pallet-title">
                    Назва палети *
                  </label>
                  <Input
                    id="pallet-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введіть назву"
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="pallet-sector"
                  >
                    Сектор (опціонально)
                  </label>
                  <Input
                    id="pallet-sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="Введіть сектор"
                  />
                </div>
                {formError && (
                  <div className="text-destructive text-sm">{formError}</div>
                )}
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createPalletMutation.isPending}
                  >
                    {createPalletMutation.isPending ? "Додається..." : "Додати"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Скасувати
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <DeleteRowDialog
            row={row}
            trigger={
              <Button variant="destructive" size="sm">
                Видалити
              </Button>
            }
            onSuccess={handleRowDeleted}
          />
        </div>
      </div>

      <Separator />

      <PalletList pallets={row.pallets} />
    </div>
  );
}
