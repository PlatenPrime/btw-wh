import { Box } from "@/components/ui";
import { SkladListPos } from "@/modules/poses/components/shared/sklad-list-pos/SkladListPos";
import type { PosResponse } from "@/modules/poses/api/types";

interface PalletLinkViewProps {
  pos: PosResponse;
  onPress: () => void;
}

export function PalletLinkView({ pos, onPress }: PalletLinkViewProps) {
  return (
    <Box>
      <SkladListPos pos={pos} onClick={onPress} />
    </Box>
  );
}

