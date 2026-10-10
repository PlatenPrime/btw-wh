import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkuSliceRowDto } from "@/modules/sku-analytics/api/types";
import { SkuSliceTableContainerView } from "@/modules/sku-analytics/components/containers/sku-slice-table-container/SkuSliceTableContainerView";
import { PatchSkuSliceDialog } from "@/modules/skus/components/dialogs/patch-sku-slice-dialog";
import type { PatchSkuSliceFormInitialValues } from "@/modules/skus/components/forms/patch-sku-slice-form";
import { useMemo, useState } from "react";

interface SkuSliceTableContainerProps {
  items: SkuSliceRowDto[];
  date: string;
}

function buildPatchInitialValues(
  item: SkuSliceRowDto,
  date: string,
): PatchSkuSliceFormInitialValues {
  return {
    mode: "date",
    date,
    stock: item.stock,
    price: item.price,
  };
}

export function SkuSliceTableContainer({
  items,
  date,
}: SkuSliceTableContainerProps) {
  const { hasRole } = useAuth();
  const canPatchSlice = hasRole(RoleType.ADMIN);
  const [patchTarget, setPatchTarget] = useState<SkuSliceRowDto | null>(null);

  const patchInitialValues = useMemo(
    () =>
      patchTarget ? buildPatchInitialValues(patchTarget, date) : undefined,
    [date, patchTarget],
  );

  const patchSkuId = patchTarget?.sku?._id ?? "";
  const patchSkuTitle =
    patchTarget?.sku?.title || patchTarget?.productId || "";

  return (
    <>
      <SkuSliceTableContainerView
        items={items}
        canPatchSlice={canPatchSlice}
        onPatchSlice={setPatchTarget}
      />
      {canPatchSlice && patchSkuId ? (
        <PatchSkuSliceDialog
          key={`${patchSkuId}-${date}-${patchTarget?.productId}`}
          skuId={patchSkuId}
          skuTitle={patchSkuTitle}
          open={Boolean(patchTarget)}
          onOpenChange={(open) => {
            if (!open) setPatchTarget(null);
          }}
          initialValues={patchInitialValues}
        />
      ) : null}
    </>
  );
}
