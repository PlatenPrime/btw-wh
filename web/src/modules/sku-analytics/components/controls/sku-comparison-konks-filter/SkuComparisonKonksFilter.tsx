import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import {
  SkuComparisonKonksFilterView,
  type SkuComparisonKonkOption,
} from "@/modules/sku-analytics/components/controls/sku-comparison-konks-filter/SkuComparisonKonksFilterView";
import { useMemo } from "react";

const BTRADE_OPTION: SkuComparisonKonkOption = {
  name: "btrade",
  title: "Btrade",
};

export interface SkuComparisonKonksFilterProps {
  excludeKonks: string[];
  onExcludeKonksChange: (names: string[]) => void;
  disabled?: boolean;
}

export function SkuComparisonKonksFilter({
  excludeKonks,
  onExcludeKonksChange,
  disabled = false,
}: SkuComparisonKonksFilterProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

  const options = useMemo<SkuComparisonKonkOption[]>(() => {
    const fromApi = konks
      .map((konk) => ({
        name: konk.name,
        title: konk.title || konk.name,
      }))
      .sort((a, b) => a.title.localeCompare(b.title, "uk"));

    return [...fromApi, BTRADE_OPTION];
  }, [konks]);

  const handleToggle = (konkName: string, checked: boolean) => {
    if (checked) {
      onExcludeKonksChange(excludeKonks.filter((name) => name !== konkName));
      return;
    }

    const includedCount = options.length - excludeKonks.length;
    if (includedCount <= 1) return;

    if (excludeKonks.includes(konkName)) return;
    onExcludeKonksChange([...excludeKonks, konkName]);
  };

  return (
    <SkuComparisonKonksFilterView
      options={options}
      excludeKonks={excludeKonks}
      onToggle={handleToggle}
      disabled={disabled}
      isLoading={konksQuery.isLoading}
    />
  );
}
