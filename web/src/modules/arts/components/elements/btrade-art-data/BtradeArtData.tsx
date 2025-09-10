import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { BtradeArtInfoView } from "./BtradeArtInfoView";

interface BtradeArtDataProps {
  data: BtradeArtInfoDto;
  // The artikul parameter is used to fetch specific art information.
}

export function BtradeArtData({

  data,
}: BtradeArtDataProps) {
  return (
    <div>
      <BtradeArtInfoView  data={data} />
    </div>
  );
}
// This component fetches and displays Btrade art information based on the artikul parameter from the URL.
// It uses the useBtradeArtInfoQuery hook to fetch the data and handles loading and error states.
