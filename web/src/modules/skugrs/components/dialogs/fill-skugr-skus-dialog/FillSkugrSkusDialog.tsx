import { Dialog } from "@/components/ui/dialog";
import { useFillSkugrSkusMutation } from "@/modules/skugrs/api/hooks/mutations/useFillSkugrSkusMutation";
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
  const fillMutation = useFillSkugrSkusMutation();

  const handleOpenChange = (next: boolean) => {
    if (!next) setMaxPagesInput("");
    onOpenChange(next);
  };

  const submitFill = useCallback(() => {
    const trimmed = maxPagesInput.trim();
    let body: { maxPages?: number } | undefined;
    if (trimmed !== "") {
      const n = Number(trimmed);
      if (!Number.isInteger(n) || n < 1 || n > 200) {
        toast.error("Некоректний ліміт сторінок", {
          description: "Вкажіть ціле число від 1 до 200 або залиште поле порожнім",
        });
        return;
      }
      body = { maxPages: n };
    }

    fillMutation.mutate(
      { id: skugrId, body },
      {
        onSuccess: () => {
          setMaxPagesInput("");
          onOpenChange(false);
        },
      },
    );
  }, [fillMutation, maxPagesInput, onOpenChange, skugrId]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <FillSkugrSkusDialogView
        konkName={konkName}
        maxPagesInput={maxPagesInput}
        isSubmitting={fillMutation.isPending}
        onMaxPagesChange={setMaxPagesInput}
        onCancel={() => handleOpenChange(false)}
        onSubmit={submitFill}
      />
    </Dialog>
  );
}
