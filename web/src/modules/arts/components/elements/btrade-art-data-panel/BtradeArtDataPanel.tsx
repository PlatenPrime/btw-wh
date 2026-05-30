import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { BtradeArtDataPanelContainer } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelContainer";
import { BtradeArtDataPanelSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelSkeleton";
import { BtradeArtDataPanelView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelView";

interface BtradeArtDataPanelProps {
  artikul: string;
}

export function BtradeArtDataPanel({ artikul }: BtradeArtDataPanelProps) {
  return (
    <BtradeArtDataPanelView>
      <BtradeArtDataFetcher
        artikul={artikul}
        ContainerComponent={BtradeArtDataPanelContainer}
        SkeletonComponent={BtradeArtDataPanelSkeleton}
      />
    </BtradeArtDataPanelView>
  );
}
