import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import { BtradeArtInfoView } from "./BtradeArtInfoView";

interface BtradeArtDataProps {
  artikul: string | undefined;
  zone?: string;
  data: BtradeArtInfoDto;
  // The artikul parameter is used to fetch specific art information.
}

export function BtradeArtData({
  zone, // zone is not used in this component but can be passed for future use
  data,
}: BtradeArtDataProps) {
  return (
    <div>
      <BtradeArtInfoView zone={zone} info={data} />
    </div>
  );
}
// This component fetches and displays Btrade art information based on the artikul parameter from the URL.
// It uses the useBtradeArtInfoQuery hook to fetch the data and handles loading and error states.
