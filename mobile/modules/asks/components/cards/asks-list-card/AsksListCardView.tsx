import { View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import { AskStatusBadge } from "@/modules/asks/components/elements/ask-status-badge/AskStatusBadge";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskSklad } from "@/modules/asks/components/elements/ask-sklad/AskSklad";
import { Image } from "expo-image";
import { formatDateTime } from "@/modules/asks/utils/format-date";

interface AsksListCardViewProps {
  ask: AskDto;
  bgColor: string;
  borderColor: string;
  onPress: () => void;
}

export function AsksListCardView({
  ask,
  bgColor,
  borderColor,
  onPress,
}: AsksListCardViewProps) {
  const formattedDate = formatDateTime(ask.createdAt);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView
        className="p-3 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <View className="gap-2">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <ArtImageLink artikul={ask.artikul} nameukr={ask.nameukr} />
            </View>
            <View style={{ alignSelf: 'flex-start' }}>
              <AskStatusBadge status={ask.status} />
            </View>
          </View>

          <View className="gap-2 pl-0">
            <AskQuant quant={ask.quant} />
            <AskCom com={ask.com} />
            <AskSklad sklad={ask.sklad} />

            {ask.askerData && (
              <View className="flex-row items-center gap-2">
                {ask.askerData.photo ? (
                  <Image
                    source={{ uri: ask.askerData.photo }}
                    style={{ width: 20, height: 20, borderRadius: 10 }}
                  />
                ) : null}
                <ThemedText className="text-xs">
                  {ask.askerData.fullname}
                </ThemedText>
              </View>
            )}

            <ThemedText className="text-xs opacity-70">
              {formattedDate}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

