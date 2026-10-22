import { useCorrectBalunBandSpikeMutation } from "@/modules/skus/api/hooks/mutations/useCorrectBalunBandSpikeMutation";
import type { CorrectBalunBandSpikeResultDto } from "@/modules/skus/api/types";
import { useCallback, useEffect, useState } from "react";

interface UseCorrectBalunBandSpikeDialogProps {
  skuId: string;
  isOpen: boolean;
  onApplied?: () => void;
}

interface UseCorrectBalunBandSpikeDialogReturn {
  preview: CorrectBalunBandSpikeResultDto | null;
  isPreviewing: boolean;
  isApplying: boolean;
  handlePreview: (dateFrom: string, dateTo: string) => void;
  handleApply: (dateFrom: string, dateTo: string) => void;
  clearPreview: () => void;
}

export function useCorrectBalunBandSpikeDialog({
  skuId,
  isOpen,
  onApplied,
}: UseCorrectBalunBandSpikeDialogProps): UseCorrectBalunBandSpikeDialogReturn {
  const [preview, setPreview] = useState<CorrectBalunBandSpikeResultDto | null>(
    null,
  );
  const [pendingMode, setPendingMode] = useState<"preview" | "apply" | null>(
    null,
  );
  const { mutate } = useCorrectBalunBandSpikeMutation();

  useEffect(() => {
    if (!isOpen) {
      setPreview(null);
      setPendingMode(null);
    }
  }, [isOpen]);

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  const handlePreview = useCallback(
    (dateFrom: string, dateTo: string) => {
      setPendingMode("preview");
      mutate(
        { skuId, body: { dateFrom, dateTo, apply: false } },
        {
          onSuccess: (response) => {
            setPreview(response.data);
          },
          onSettled: () => {
            setPendingMode(null);
          },
        },
      );
    },
    [mutate, skuId],
  );

  const handleApply = useCallback(
    (dateFrom: string, dateTo: string) => {
      setPendingMode("apply");
      mutate(
        { skuId, body: { dateFrom, dateTo, apply: true } },
        {
          onSuccess: (response) => {
            setPreview(response.data);
            if (response.data.applied) {
              onApplied?.();
            }
          },
          onSettled: () => {
            setPendingMode(null);
          },
        },
      );
    },
    [mutate, onApplied, skuId],
  );

  return {
    preview,
    isPreviewing: pendingMode === "preview",
    isApplying: pendingMode === "apply",
    handlePreview,
    handleApply,
    clearPreview,
  };
}
