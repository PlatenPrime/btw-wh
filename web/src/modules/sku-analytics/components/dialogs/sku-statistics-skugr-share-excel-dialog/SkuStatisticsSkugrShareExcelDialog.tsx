import { Dialog } from "@/components/ui/dialog";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { useCallback, useEffect, useState } from "react";
import {
  SkuStatisticsSkugrShareExcelDialogView,
  type SkuStatisticsSkugrShareExcelExportSort,
} from "./SkuStatisticsSkugrShareExcelDialogView";

interface SkuStatisticsSkugrShareExcelDialogProps {
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SkuStatisticsSkugrShareExcelDialog({
  skugrId,
  dateFrom,
  dateTo,
  open: controlledOpen,
  onOpenChange,
}: SkuStatisticsSkugrShareExcelDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [exportSort, setExportSort] =
    useState<SkuStatisticsSkugrShareExcelExportSort>("default");
  const [includeImages, setIncludeImages] = useState(true);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { startJob, isStarting } = useStartExcelJob();

  const canSubmit = Boolean(skugrId && dateFrom && dateTo);

  const handleDownload = useCallback(async () => {
    if (!canSubmit) return;

    const sortBy =
      exportSort === "sales"
        ? ("sales" as const)
        : exportSort === "revenue"
          ? ("revenue" as const)
          : undefined;

    try {
      const job = await startJob({
        kind: "sku-skugr-skus-share",
        params: {
          skugrId,
          dateFrom,
          dateTo,
          ...(sortBy ? { sortBy } : {}),
          ...(includeImages ? { includeImages: true } : {}),
        },
        title: includeImages
          ? "Статистика SKU: частки з фото"
          : "Статистика SKU: частки",
      });
      if (job) handleOpenChange(false);
    } catch {
      // toast in provider
    }
  }, [
    canSubmit,
    exportSort,
    includeImages,
    skugrId,
    dateFrom,
    dateTo,
    startJob,
    handleOpenChange,
  ]);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  useEffect(() => {
    if (open) {
      setExportSort("default");
      setIncludeImages(true);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <SkuStatisticsSkugrShareExcelDialogView
        dateFrom={dateFrom}
        dateTo={dateTo}
        exportSort={exportSort}
        onExportSortChange={setExportSort}
        includeImages={includeImages}
        onIncludeImagesChange={setIncludeImages}
        isExporting={isStarting}
        isDownloadDisabled={!canSubmit}
        onDownload={handleDownload}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
