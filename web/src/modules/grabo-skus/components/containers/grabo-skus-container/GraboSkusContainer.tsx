import { GraboSkusContainerView } from "@/modules/grabo-skus/components/containers/grabo-skus-container/GraboSkusContainerView";
import type { GraboSkusContainerViewProps } from "@/modules/grabo-skus/components/containers/grabo-skus-container/GraboSkusContainerView";

export type GraboSkusContainerProps = GraboSkusContainerViewProps;

export function GraboSkusContainer(props: GraboSkusContainerProps) {
  return <GraboSkusContainerView {...props} />;
}
