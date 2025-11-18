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
import { handleExportPosesStocks } from "@/modules/poses/utils/handle-export-poses-stocks/handleExportPosesStocks";

interface ExportPosesStocksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportPosesStocksDialog({
  open,
  onOpenChange,
}: ExportPosesStocksDialogProps) {
  const [selectedSklad, setSelectedSklad] = useState<SkladCode | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedSklad(null);
      setIsSubmitting(false);
    }
  }, [open]);

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await handleExportPosesStocks(selectedSklad ?? undefined);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
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
                disabled={!selectedSklad || isSubmitting}
              >
                Очистити
              </Button>
            </div>
            <Select
              value={selectedSklad ?? undefined}
              onValueChange={(value) => setSelectedSklad(value as SkladCode)}
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            Скасувати
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Завантаження..." : "Скачати"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

