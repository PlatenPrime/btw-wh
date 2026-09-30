import { Dialog } from "@/components/ui/dialog";
import { useStartApiTask } from "@/modules/apitasks";
import { FillSkugrSkusDialogView } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialogView";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface FillSkugrSkusDialogProps {
  skugrId: string;
  konkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FillSkugrSkusDialog({
  skugrId,
  konkName,
  open,
  onOpenChange,
}: FillSkugrSkusDialogProps) {
  const [maxPagesInput, setMaxPagesInput] = useState("");
  const { startTask, isStarting } = useStartApiTask();

  const handleOpenChange = (next: boolean) => {
    if (!next) setMaxPagesInput("");
    onOpenChange(next);
  };

  const submitFill = useCallback(() => {
    const trimmed = maxPagesInput.trim();
    const params: { skugrId: string; maxPages?: number } = { skugrId };
    if (trimmed !== "") {
      const n = Number(trimmed);
      if (!Number.isInteger(n) || n < 1 || n > 200) {
        toast.error("Некоректний ліміт сторінок", {
          description:
            "Вкажіть ціле число від 1 до 200 або залиште поле порожнім",
        });
        return;
      }
      params.maxPages = n;
    }

    void startTask({
      kind: "skugrs.fill-skus",
      params,
      title: `Заповнення групи · ${konkName}`,
    })
      .then((task) => {
        if (task) {
          setMaxPagesInput("");
          onOpenChange(false);
        }
      })
      .catch(() => {
        // toast у provider
      });
  }, [konkName, maxPagesInput, onOpenChange, skugrId, startTask]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <FillSkugrSkusDialogView
        konkName={konkName}
        maxPagesInput={maxPagesInput}
        isSubmitting={isStarting}
        onMaxPagesChange={setMaxPagesInput}
        onCancel={() => handleOpenChange(false)}
        onSubmit={submitFill}
      />
    </Dialog>
  );
}
