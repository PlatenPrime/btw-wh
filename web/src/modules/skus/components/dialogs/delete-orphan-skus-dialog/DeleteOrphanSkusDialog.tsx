import { Dialog } from "@/components/ui/dialog";
import { useStartApiTask } from "@/modules/apitasks";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { DeleteOrphanSkusQueryDto } from "@/modules/skus/api/types";
import { DeleteOrphanSkusDialogView } from "@/modules/skus/components/dialogs/delete-orphan-skus-dialog/DeleteOrphanSkusDialogView";
import { useCallback, useEffect, useMemo, useState } from "react";

interface DeleteOrphanSkusDialogProps {
  konks: KonkDto[];
  prods: ProdDto[];
  filters: DeleteOrphanSkusQueryDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function buildFilterSummaryLines(
  filters: DeleteOrphanSkusQueryDto,
  konks: KonkDto[],
  prods: ProdDto[],
): string[] {
  const lines: string[] = [];
  if (filters.konkName?.trim()) {
    const k = konks.find((x) => x.name === filters.konkName);
    lines.push(`Конкурент: ${k?.title ?? filters.konkName}`);
  }
  if (filters.prodName?.trim()) {
    const p = prods.find((x) => x.name === filters.prodName);
    lines.push(`Виробник: ${p?.title ?? filters.prodName}`);
  }
  if (filters.search?.trim()) {
    lines.push(`Пошук: «${filters.search.trim()}»`);
  }
  if (filters.isInvalid === true) {
    lines.push("Лише невалідні");
  }
  if (filters.createdFrom?.trim()) {
    lines.push(`З дати: ${filters.createdFrom.trim()}`);
  }
  return lines;
}

export function DeleteOrphanSkusDialog({
  konks,
  prods,
  filters,
  open,
  onOpenChange,
}: DeleteOrphanSkusDialogProps) {
  const { startTask, isStarting } = useStartApiTask();

  const hasPageFilters = useMemo(() => {
    return Boolean(
      filters.konkName?.trim() ||
        filters.prodName?.trim() ||
        filters.search?.trim() ||
        filters.isInvalid === true ||
        filters.createdFrom?.trim(),
    );
  }, [filters]);

  const filterSummaryLines = useMemo(
    () => buildFilterSummaryLines(filters, konks, prods),
    [filters, konks, prods],
  );

  const [applyPageFilters, setApplyPageFilters] = useState(true);

  useEffect(() => {
    if (open) {
      setApplyPageFilters(hasPageFilters);
    }
  }, [open, hasPageFilters]);

  const handleSubmit = useCallback(async () => {
    const payload =
      hasPageFilters && applyPageFilters
        ? filters
        : ({} as DeleteOrphanSkusQueryDto);
    try {
      const task = await startTask({
        kind: "skus.delete-not-in-any-skugr",
        params: { ...payload },
        title: "Видалення SKU без групи",
      });
      if (task) onOpenChange(false);
    } catch {
      // toast у provider
    }
  }, [applyPageFilters, filters, hasPageFilters, onOpenChange, startTask]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteOrphanSkusDialogView
        hasPageFilters={hasPageFilters}
        applyPageFilters={applyPageFilters}
        onApplyPageFiltersChange={setApplyPageFilters}
        filterSummaryLines={filterSummaryLines}
        isDeleting={isStarting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
