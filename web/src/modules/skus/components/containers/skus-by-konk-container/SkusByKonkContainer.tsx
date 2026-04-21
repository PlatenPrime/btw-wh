import { SkusByKonkContainerView } from "@/modules/skus/components/containers/skus-by-konk-container/SkusByKonkContainerView";
import type { SkusByKonkContainerViewProps } from "@/modules/skus/components/containers/skus-by-konk-container/SkusByKonkContainerView";

export type SkusByKonkContainerProps = SkusByKonkContainerViewProps;

export function SkusByKonkContainer(props: SkusByKonkContainerProps) {
  return <SkusByKonkContainerView {...props} />;
}
