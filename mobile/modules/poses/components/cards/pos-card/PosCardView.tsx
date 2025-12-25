import { Box, Card, HStack } from "@/components/ui";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import type { IPos } from "@/modules/poses/api/types";
import { View } from "react-native";
import { PosInfoItem } from "./components/pos-info-item/PosInfoItem";

interface PosCardViewProps {
  pos: IPos;
  skladName: string;
  menu?: React.ReactNode;
}

export function PosCardView({ pos, skladName, menu }: PosCardViewProps) {
  return (
    <Card variant="outlined" className="p-2 " >
      {/* Header with image, title and menu */}
      <HStack className="items-start justify-between mb-2">
        <Box className="flex-1">
          <ArtImageLink artikul={pos.artikul} nameukr={pos.nameukr} />
        </Box>
        {menu && <View>{menu}</View>}
      </HStack>

      {/* Content with metrics */}
      <Box className="flex-row gap-2">
        <Box className="flex-1">
          <PosInfoItem icon="warehouse" value={skladName} />
        </Box>
        <Box className="flex-1">
          <PosInfoItem
            icon="box"
            iconFamily="Feather"
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
    </Card>
  );
}
