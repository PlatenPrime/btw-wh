import { BtradeArtDataPanelContainerView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelContainerView";
import { BtradeArtDataPanelSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelSkeleton";
import { BtradeArtDataPanelView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelView";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface BtradeArtDataPanelProps {
  artikul: string;
}

export function BtradeArtDataPanel({ artikul }: BtradeArtDataPanelProps) {
  return (
    <BtradeArtDataFetcher
      artikul={artikul}
      ChromeComponent={BtradeArtDataPanelView}
      ContainerComponent={BtradeArtDataPanelContainerView}
      SkeletonComponent={BtradeArtDataPanelSkeleton}
    />
  );
}
