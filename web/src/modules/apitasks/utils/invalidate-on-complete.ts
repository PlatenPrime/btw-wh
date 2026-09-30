import type {
  ApiTaskKind,
  ApiTaskParams,
} from "@/modules/apitasks/api/types";
import type { QueryKey } from "@tanstack/react-query";

/**
 * Query keys to invalidate after a successful ApiTask completion.
 * Keys are prefixes — invalidateQueries matches partial.
 */
export function getInvalidateQueryKeys(
  kind: ApiTaskKind,
  params: ApiTaskParams = {},
): QueryKey[] {
  switch (kind) {
    case "sku-slices.skugr-run-today":
    case "slice-compensation.run":
      return [["sku-slices"]];

    case "skugrs.fill-skus": {
      const keys: QueryKey[] = [["skugrs"], ["skusBySkugr"]];
      const skugrId = params.skugrId;
      if (typeof skugrId === "string" && skugrId.length > 0) {
        keys.push(["skugrs", "id", skugrId]);
      }
      return keys;
    }

    case "arts.btrade-stock-update-all":
      return [["arts"]];

    case "dels.artikuls-update-all": {
      const delId = params.delId;
      if (typeof delId === "string" && delId.length > 0) {
        return [["dels", delId], ["dels"]];
      }
      return [["dels"]];
    }

    case "pallet-groups.recalculate-pallets-sectors":
      return [["pallet-groups"], ["pallets"]];

    case "blocks.recalculate-zones-sectors":
      return [
        ["zones"],
        ["zones-infinite"],
        ["segs"],
        ["blocks"],
      ];

    case "skus.delete-konk-invalid":
      return [["skusCatalog"], ["skusByKonk"]];

    case "skus.delete-not-in-any-skugr":
      return [["skusCatalog"], ["skusByKonk"], ["skusBySkugr"]];

    case "arts.delete-without-latest-marker":
      return [["arts"]];

    case "grabo-skus.sync":
      return [["grabo-skus"]];

    case "poses.populate-missing-data":
      return [["poses"]];

    case "skus.fix-incorrect-sku-data":
      return [["skusCatalog"], ["skusByKonk"], ["skusBySkugr"]];

    default:
      return [];
  }
}
