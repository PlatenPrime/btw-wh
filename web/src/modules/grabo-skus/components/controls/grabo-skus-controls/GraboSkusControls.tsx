import { useGraboSkuFilterOptionsQuery } from "@/modules/grabo-skus/api/hooks/queries/useGraboSkuFilterOptionsQuery";
import { EMPTY_GRABO_SKU_FILTER_OPTIONS } from "@/modules/grabo-skus/api/types";
import { GraboSkusControlsView } from "@/modules/grabo-skus/components/controls/grabo-skus-controls/GraboSkusControlsView";
import type { GraboTriStateFilter } from "@/modules/grabo-skus/hooks/useGraboSkusParams";

export interface GraboSkusControlsProps {
  limit: number;
  setLimit: (n: number) => void;
  search: string;
  setSearch: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  size: string;
  setSize: (v: string) => void;
  material: string;
  setMaterial: (v: string) => void;
  gas: string;
  setGas: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  gasCapacity: string;
  setGasCapacity: (v: string) => void;
  tag: string;
  setTag: (v: string) => void;
  isOnSite: GraboTriStateFilter;
  setIsOnSite: (v: GraboTriStateFilter) => void;
  isNewProduct: GraboTriStateFilter;
  setIsNewProduct: (v: GraboTriStateFilter) => void;
}

export function GraboSkusControls(props: GraboSkusControlsProps) {
  const filterOptionsQuery = useGraboSkuFilterOptionsQuery();
  const filterOptions =
    filterOptionsQuery.data ?? EMPTY_GRABO_SKU_FILTER_OPTIONS;

  return (
    <GraboSkusControlsView {...props} filterOptions={filterOptions} />
  );
}
