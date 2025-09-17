import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainerView } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainerView.tsx";

interface BtradeArtDataContainerProps {
  data: BtradeArtInfoDto;
  // The artikul parameter is used to fetch specific art information.
}

export function BtradeArtDataContainer({ data }: BtradeArtDataContainerProps) {
  return (
    <div>
      <BtradeArtDataContainerView data={data} />
    </div>
  );
}
// This component fetches and displays Btrade art information based on the artikul parameter from the URL.
// It uses the useBtradeArtInfoQuery hook to fetch the data and handles loading and error states.
