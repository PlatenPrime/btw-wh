import type { BtradeArtDataContainerProps } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { BtradeArtDataPanelContainerView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelContainerView";

export function BtradeArtDataPanelContainer(props: BtradeArtDataContainerProps) {
  return <BtradeArtDataPanelContainerView {...props} />;
}
