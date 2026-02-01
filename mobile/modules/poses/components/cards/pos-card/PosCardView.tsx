import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack } from "@/components/themed";
import { ArtImageLink } from "@/components/shared/art-image-link";
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
    <GlassCard className="p-2">
      {/* Header with image, title and menu */}
      <ThemedHStack className="items-start justify-between mb-2">
        <ThemedBox className="flex-1">
          <ArtImageLink artikul={pos.artikul} nameukr={pos.nameukr} link={`/(tabs)/arts/${pos.artikul}`} />
        </ThemedBox>
        {menu && <View>{menu}</View>}
      </ThemedHStack>

      {/* Content with metrics */}
      <ThemedBox className="flex-row gap-2">
        <ThemedBox className="flex-1">
          <PosInfoItem icon="warehouse" value={skladName} />
        </ThemedBox>
        <ThemedBox className="flex-1">
          <PosInfoItem
            icon="box"
            iconFamily="Feather"
            value={pos.boxes || 0}
            isError={pos.boxes === 0}
          />
        </ThemedBox>
        <ThemedBox className="flex-1">
          <PosInfoItem
            icon="radio-button-unchecked"
            value={pos.quant || 0}
            isError={pos.quant === 0}
          />
        </ThemedBox>
      </ThemedBox>
    </GlassCard>
  );
}
