import { ArtImageLink } from "@/components/shared/art-image-link";
import { GlassCard } from "@/components/shared/glass-card";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { DefCardAskBid } from "./components/DefCardAskBid";
import { DefCardIndicator } from "./components/DefCardIndicator";
import { DefCardQuants } from "./components/DefCardQuants";
import { View } from "react-native";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  return (
    <GlassCard className="p-3">
      <View className="gap-2">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <ArtImageLink
              artikul={artikul}
              nameukr={defItem.nameukr}
              link={`/(tabs)/arts/${artikul}`}
            />
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <DefCardIndicator defItem={defItem} />
          </View>
        </View>

        <View className="flex-row gap-3 items-start">
          <View className="flex-1 min-w-0">
            <DefCardQuants defItem={defItem} />
          </View>
          <View className="flex-1 min-w-0">
            {defItem.existingAsk ? (
              <DefCardAskBid ask={defItem.existingAsk} />
            ) : (
              <DefAskButton artikul={artikul} />
            )}
          </View>
        </View>
      </View>
    </GlassCard>
  );
}
