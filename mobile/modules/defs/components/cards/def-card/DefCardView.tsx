import { ArtImageLink } from "@/components/shared/art-image-link";
import { ThemedView } from "@/components/themed/themed-view";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { View } from "react-native";
import { DefCardAskBid } from "./components/DefCardAskBid";
import { DefCardIndicator } from "./components/DefCardIndicator";
import { DefCardQuants } from "./components/DefCardQuants";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  const { card } = useThemeColors();
  const bgColor = card.bg;
  const borderColor = card.border;

  return (
    <ThemedView
      className="p-2 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
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

        <DefCardQuants defItem={defItem} />

        {defItem.existingAsk ? (
          <DefCardAskBid ask={defItem.existingAsk} />
        ) : (
          <DefAskButton artikul={artikul} />
        )}
      </View>
    </ThemedView>
  );
}
