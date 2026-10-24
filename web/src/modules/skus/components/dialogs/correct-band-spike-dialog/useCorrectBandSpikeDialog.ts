import { useCorrectBandSpikeMutation } from "@/modules/skus/api/hooks/mutations/useCorrectBandSpikeMutation";
import type { CorrectBandSpikeResultDto } from "@/modules/skus/api/types";
import { useCallback, useEffect, useState } from "react";

interface UseCorrectBandSpikeDialogProps {
  skuId: string;
  isOpen: boolean;
  onApplied?: () => void;
}

interface CorrectBandSpikeParams {
  dateFrom: string;
  dateTo: string;
  stockMin: number;
  stockMax: number;
}

interface UseCorrectBandSpikeDialogReturn {
  preview: CorrectBandSpikeResultDto | null;
  isPreviewing: boolean;
  isApplying: boolean;
  handlePreview: (params: CorrectBandSpikeParams) => void;
  handleApply: (params: CorrectBandSpikeParams) => void;
  clearPreview: () => void;
}

export function useCorrectBandSpikeDialog({
  skuId,
  isOpen,
  onApplied,
}: UseCorrectBandSpikeDialogProps): UseCorrectBandSpikeDialogReturn {
  const [preview, setPreview] = useState<CorrectBandSpikeResultDto | null>(
    null,
  );
  const [pendingMode, setPendingMode] = useState<"preview" | "apply" | null>(
    null,
  );
  const { mutate } = useCorrectBandSpikeMutation();

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
    ({ dateFrom, dateTo, stockMin, stockMax }: CorrectBandSpikeParams) => {
      setPendingMode("preview");
      mutate(
        {
          skuId,
          body: { dateFrom, dateTo, stockMin, stockMax, apply: false },
        },
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
    ({ dateFrom, dateTo, stockMin, stockMax }: CorrectBandSpikeParams) => {
      setPendingMode("apply");
      mutate(
        {
          skuId,
          body: { dateFrom, dateTo, stockMin, stockMax, apply: true },
        },
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
