import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";
import type { IPos } from "@/modules/poses/api/types";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import { PosInfoItem } from "./components/pos-info-item/PosInfoItem";

interface PosCardViewProps {
  pos: IPos;
  bgColor: string;
  borderColor: string;
  skladName: string;
}

export function PosCardView({
  pos,
  bgColor,
  borderColor,
  skladName,
}: PosCardViewProps) {
  return (
    <View
      className="p-2 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {/* Header with image and title */}
      <View className="mb-2">
        <ArtImageLink artikul={pos.artikul} nameukr={pos.nameukr} />
      </View>

      {/* Content with metrics */}
      <View className="flex-row gap-1.5">
        <View className="flex-1">
          <PosInfoItem
            icon="warehouse"
            value={skladName}
          />
        </View>
        <View className="flex-1">
          <PosInfoItem
            icon="inventory-2"
            value={pos.boxes || 0}
            isError={pos.boxes === 0}
          />
        </View>
        <View className="flex-1">
          <PosInfoItem
            icon="radio-button-unchecked"
            value={pos.quant || 0}
            isError={pos.quant === 0}
          />
        </View>
      </View>
    </View>
  );
}
