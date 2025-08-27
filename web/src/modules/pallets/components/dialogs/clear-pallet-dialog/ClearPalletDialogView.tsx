import { ClearTrigger } from "@/components/triggers/clear-trigger.tsx/ClearTrigger";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { ClearPalletResponse, IPallet } from "@/modules/pallets/api/types";

import type { UseMutationResult } from "@tanstack/react-query";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

interface ClearPalletDialogViewProps {
  pallet: IPallet;
  handleClear: () => void | Promise<void>;
  clearMutation: UseMutationResult<ClearPalletResponse, Error, void, unknown>;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ClearPalletDialogView({
  pallet,
  handleClear,
  clearMutation,
  trigger,
  open,
  setOpen,
}: ClearPalletDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        {trigger || <ClearTrigger />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Очистити палету "{pallet.title}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете очистити палету "{pallet.title}"? Цю дію
            неможливо скасувати, вона також призведе до видалення всіх
            пов'язаних позицій.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="destructive"
            onClick={handleClear}
            disabled={clearMutation.isPending}
          >
            {clearMutation.isPending ? "Очищення.." : "Очистити"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={clearMutation.isPending}
          >
            Скасувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
