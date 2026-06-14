import { BtradeArtDataPanelContainerView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelContainerView";
import { BtradeArtDataPanelEmbeddedSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelEmbeddedSkeleton";
import { BtradeArtDataPanelEmbeddedView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelEmbeddedView";
import { BtradeArtDataPanelSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelSkeleton";
import { BtradeArtDataPanelView } from "@/modules/arts/components/elements/btrade-art-data-panel/BtradeArtDataPanelView";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface BtradeArtDataPanelProps {
  artikul: string;
  variant?: "default" | "embedded";
}

export function BtradeArtDataPanel({
  artikul,
  variant = "default",
}: BtradeArtDataPanelProps) {
  const isEmbedded = variant === "embedded";

  return (
    <BtradeArtDataFetcher
      artikul={artikul}
      ChromeComponent={
        isEmbedded ? BtradeArtDataPanelEmbeddedView : BtradeArtDataPanelView
      }
      ContainerComponent={BtradeArtDataPanelContainerView}
      SkeletonComponent={
        isEmbedded ? BtradeArtDataPanelEmbeddedSkeleton : BtradeArtDataPanelSkeleton
      }
    />
  );
}
