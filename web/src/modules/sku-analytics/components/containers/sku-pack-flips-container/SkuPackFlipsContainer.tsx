import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type {
  PackFlipFindingDto,
  PackFlipsPayload,
} from "@/modules/sku-analytics/api/types";
import { SkuPackFlipsContainerView } from "@/modules/sku-analytics/components/containers/sku-pack-flips-container/SkuPackFlipsContainerView";
import type { SkuPackFlipsTableVariant } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";
import { PatchSkuSliceDialog } from "@/modules/skus/components/dialogs/patch-sku-slice-dialog";
import type { PatchSkuSliceFormInitialValues } from "@/modules/skus/components/forms/patch-sku-slice-form";
import { useMemo, useState } from "react";

export interface SkuPackFlipsContainerProps {
  data: PackFlipsPayload;
}

function buildVisibleSections(data: PackFlipsPayload) {
  const sections: Array<{
    variant: SkuPackFlipsTableVariant;
    items: PackFlipFindingDto[];
  }> = [
    { variant: "patched", items: data.patched },
    { variant: "priceOnly", items: data.priceOnly },
    { variant: "ambiguous", items: data.ambiguous },
  ];

  return sections.filter((section) => section.items.length > 0);
}

function buildPatchInitialValues(
  item: PackFlipFindingDto,
): PatchSkuSliceFormInitialValues {
  const point = item.patched ?? item.from;
  return {
    mode: "date",
    date: item.date,
    stock: point.stock,
    price: point.price,
  };
}

export function SkuPackFlipsContainer({ data }: SkuPackFlipsContainerProps) {
  const { hasRole } = useAuth();
  const canPatchSlice = hasRole(RoleType.ADMIN);
  const [patchTarget, setPatchTarget] = useState<PackFlipFindingDto | null>(
    null,
  );

  const sections = useMemo(() => buildVisibleSections(data), [data]);
  const patchInitialValues = useMemo(
    () => (patchTarget ? buildPatchInitialValues(patchTarget) : undefined),
    [patchTarget],
  );

  return (
    <>
      <SkuPackFlipsContainerView
        sections={sections}
        canPatchSlice={canPatchSlice}
        onPatchSlice={setPatchTarget}
      />
      {canPatchSlice && patchTarget?.skuId ? (
        <PatchSkuSliceDialog
          key={`${patchTarget.skuId}-${patchTarget.date}-${patchTarget.kind}-${patchTarget.neighborDate}`}
          skuId={patchTarget.skuId}
          skuTitle={patchTarget.title || patchTarget.productId}
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
