import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTrigger, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { CreatePalletDto, IPallet } from "@/modules/pallets/api/types";
import type { UseMutationResult } from "@tanstack/react-query";
import { Plus } from "lucide-react";

interface CreatePalletDialogViewProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: (title: string) => void;
    sector: string;
    setSector: (sector: string) => void;
    formError: string | null;
    createPalletMutation: UseMutationResult<IPallet, Error, CreatePalletDto, unknown>;
}


export  function CreatePalletDialogView({open, setOpen, handleSubmit, title, setTitle, sector, setSector, formError, createPalletMutation}: CreatePalletDialogViewProps) {
 

  return (
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
            <label className="text-sm font-medium" htmlFor="pallet-sector">
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
            <Button type="submit" disabled={createPalletMutation.isPending}>
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
  )
}
