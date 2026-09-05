import { Dialog } from "@/components/ui/dialog";
import { useFillSkugrSkusMutation } from "@/modules/skugrs/api/hooks/mutations/useFillSkugrSkusMutation";
import { FillAirSkugrSkusDialogView } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillAirSkugrSkusDialogView";
import { FillSkugrSkusDialogView } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialogView";
import { useAirSkugrSingleFill } from "@/modules/skugrs/hooks/useAirSkugrSingleFill";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface FillSkugrSkusDialogProps {
  skugrId: string;
  skugrUrl: string;
  skugrTitle?: string;
  konkName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isAirKonk(konkName: string): boolean {
  return konkName.toLowerCase() === "air";
}

function FillServerSkugrSkusDialog({
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

function FillAirSkugrSkusDialog({
  skugrId,
  skugrUrl,
  skugrTitle,
  open,
  onOpenChange,
}: FillSkugrSkusDialogProps) {
  const { state, isRunning, extensionAvailable, run, stop, reset, recheckExtension } =
    useAirSkugrSingleFill(
      {
        skugrId,
        url: skugrUrl,
        title: skugrTitle,
      },
      { enabled: open },
    );

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleOpenChange = (next: boolean) => {
    if (!next && isRunning) {
      stop();
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <FillAirSkugrSkusDialogView
        skugrUrl={skugrUrl}
        extensionAvailable={extensionAvailable}
        isRunning={isRunning}
        state={state}
        onRecheckExtension={() => void recheckExtension()}
        onCancel={() => handleOpenChange(false)}
        onSubmit={() => void run()}
        onStop={stop}
      />
    </Dialog>
  );
}

export function FillSkugrSkusDialog(props: FillSkugrSkusDialogProps) {
  if (isAirKonk(props.konkName)) {
    return <FillAirSkugrSkusDialog {...props} />;
  }
  return <FillServerSkugrSkusDialog {...props} />;
}
