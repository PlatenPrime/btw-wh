import { CompetitorSkusContainerView } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainerView";
import type { CompetitorSkusContainerViewProps } from "@/modules/skus/components/containers/competitor-skus-container/CompetitorSkusContainerView";

export type CompetitorSkusContainerProps = CompetitorSkusContainerViewProps;

export function CompetitorSkusContainer(props: CompetitorSkusContainerProps) {
  return <CompetitorSkusContainerView {...props} />;
}
