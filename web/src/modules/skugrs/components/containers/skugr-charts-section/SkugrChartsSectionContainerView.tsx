import { SkugrChartsSectionView } from "@/modules/skugrs/components/charts/skugr-charts-section";
import type { ComponentProps } from "react";

type SkugrChartsSectionContainerViewProps = ComponentProps<
  typeof SkugrChartsSectionView
>;

export function SkugrChartsSectionContainerView(
  props: SkugrChartsSectionContainerViewProps,
) {
  return <SkugrChartsSectionView {...props} />;
}
