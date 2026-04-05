import { Dialog } from "@/components/ui/dialog";
import { useDownloadNewSinceSkusExcelMutation } from "@/modules/skus/api/hooks/mutations/useDownloadNewSinceSkusExcelMutation";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { SkusNewSinceExcelDialogView } from "./SkusNewSinceExcelDialogView";

function defaultSinceDate(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

interface SkusNewSinceExcelDialogProps {
  konkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkusNewSinceExcelDialog({
  konkName,
  open,
  onOpenChange,
}: SkusNewSinceExcelDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultSinceDate,
  );
  const mutation = useDownloadNewSinceSkusExcelMutation();

  useEffect(() => {
    if (open) {
      setSelectedDate(defaultSinceDate());
    }
  }, [open]);

  const handleDownload = useCallback(async () => {
    if (!selectedDate) return;
    const since = format(selectedDate, "yyyy-MM-dd");
    try {
      await mutation.mutateAsync({ konkName, since });
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [konkName, selectedDate, mutation, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <SkusNewSinceExcelDialogView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        isDownloading={mutation.isPending}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
