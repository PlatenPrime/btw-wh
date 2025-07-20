import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { useMovePalletPosesMutation } from "../../../pallets/api/useMovePalletPosesMutation";

interface PalletOption {
  value: string;
  label: string;
}

interface MovePosDialogProps {
  fromPalletId: string;
  palletOptions: PalletOption[];
  selectedPosIds: string[];
  onSuccess?: () => void;
  trigger: React.ReactNode;
}

export function MovePosDialog({
  fromPalletId,
  palletOptions,
  selectedPosIds,
  onSuccess,
  trigger,
}: MovePosDialogProps) {
  const [open, setOpen] = useState(false);
  const [toPalletId, setToPalletId] = useState<string>("");
  const mutation = useMovePalletPosesMutation(fromPalletId, toPalletId);

  const handleMove = async () => {
    if (!toPalletId || selectedPosIds.length === 0) return;
    try {
      await mutation.mutateAsync(selectedPosIds);
      setOpen(false);
      setToPalletId("");
      onSuccess?.();
    } catch (e) {
      // TODO: обработка ошибок
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Перемістити позиції</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Виберіть цільову паллету
            </label>
            <Select
              value={toPalletId}
              onValueChange={setToPalletId}
              disabled={mutation.isPending}
            >
              <option value="" disabled>
                Оберіть паллету...
              </option>
              {palletOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="text-muted-foreground text-xs">
            Буде переміщено {selectedPosIds.length} позицій
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="default"
            onClick={handleMove}
            disabled={
              !toPalletId || selectedPosIds.length === 0 || mutation.isPending
            }
          >
            Перемістити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
