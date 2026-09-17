import { useEffect, useState } from "react";

import { sklads, type SkladCode } from "@/constants/sklad";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStartExcelJob } from "@/modules/excel-jobs";

interface ExportPosesStocksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportPosesStocksDialog({
  open,
  onOpenChange,
}: ExportPosesStocksDialogProps) {
  const [selectedSklad, setSelectedSklad] = useState<SkladCode | null>(null);
  const { startJob, isStarting } = useStartExcelJob();

  useEffect(() => {
    if (!open) {
      setSelectedSklad(null);
    }
  }, [open]);

  const handleClose = () => {
    if (!isStarting) {
      onOpenChange(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const job = await startJob({
        kind: "poses-export-stocks",
        params: selectedSklad ? { sklad: selectedSklad } : {},
        title: selectedSklad
          ? `Залишки позицій · ${sklads[selectedSklad]}`
          : "Залишки позицій",
      });
      if (job) onOpenChange(false);
    } catch {
      // toast in provider
    }
  };

  const handleReset = () => {
    setSelectedSklad(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вивантажити залишки</DialogTitle>
          <DialogDescription>
            Оберіть конкретний склад або залиште поле порожнім, щоб завантажити
            всі залишки.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sklad-select">Склад</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                disabled={!selectedSklad || isStarting}
              >
                Очистити
              </Button>
            </div>
            <Select
              value={selectedSklad ?? undefined}
              onValueChange={(value) => setSelectedSklad(value as SkladCode)}
              disabled={isStarting}
            >
              <SelectTrigger id="sklad-select" className="w-full">
                <SelectValue placeholder="Всі склади" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pogrebi">{sklads.pogrebi}</SelectItem>
                <SelectItem value="merezhi">{sklads.merezhi}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isStarting}
          >
            Скасувати
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isStarting}>
            {isStarting ? "Постановка..." : "Скачати"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
