import { ThemedText } from "@/components/themed-text";
import { Box } from "@/components/ui";
import type { IPos } from "@/modules/poses/api/types";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import { PosInfoItem } from "./components/pos-info-item/PosInfoItem";

interface PosCardViewProps {
  pos: IPos;
  skladName: string;
}

export function PosCardView({
  pos,
  skladName,
}: PosCardViewProps) {
  return (
    <Box className="p-2 rounded-lg border border-outline-200 bg-background-0">
      {/* Header with image and title */}
      <Box className="mb-2">
        <ArtImageLink artikul={pos.artikul} nameukr={pos.nameukr} />
      </Box>

      {/* Content with metrics */}
      <Box className="flex-row gap-1.5">
        <Box className="flex-1">
          <PosInfoItem
            icon="warehouse"
            value={skladName}
          />
        </Box>
        <Box className="flex-1">
          <PosInfoItem
            icon="inventory-2"
            value={pos.boxes || 0}
            isError={pos.boxes === 0}
          />
        </Box>
        <Box className="flex-1">
          <PosInfoItem
            icon="radio-button-unchecked"
            value={pos.quant || 0}
            isError={pos.quant === 0}
          />
        </Box>
      </Box>
    </Box>
  );
}
