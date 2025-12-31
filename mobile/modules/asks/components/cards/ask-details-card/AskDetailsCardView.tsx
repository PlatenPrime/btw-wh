import { ArtImageLink } from "@/components/shared/art-image-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskCom } from "@/modules/asks/components/elements/ask-com/AskCom";
import { AskQuant } from "@/modules/asks/components/elements/ask-quant/AskQuant";
import { AskSklad } from "@/modules/asks/components/elements/ask-sklad/AskSklad";
import { AskStatusBadge } from "@/modules/asks/components/elements/ask-status-badge/AskStatusBadge";
import { Image } from "expo-image";
import { View } from "react-native";

interface AskDetailsCardViewProps {
  artikul: string;
  nameukr?: string;
  status: AskDto["status"];
  quant?: number;
  com?: string;
  sklad?: "pogrebi" | "merezhi";
  askerData?: AskDto["askerData"];
  createdAt: string;
  bgColor: string;
  borderColor: string;
  formattedDate: string;
  imageUrl?: string;
  onImagePress?: () => void;
}

export function AskDetailsCardView({
  artikul,
  nameukr,
  status,
  quant,
  com,
  sklad,
  askerData,
  bgColor,
  borderColor,
  formattedDate,
}: AskDetailsCardViewProps) {
  return (
    <ThemedView
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="gap-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <ArtImageLink
              artikul={artikul}
              nameukr={nameukr}
              link={`/(tabs)/arts/${artikul}`}
            />
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <AskStatusBadge status={status} />
          </View>
        </View>

        <View className="gap-2">
          <AskQuant quant={quant} />
          <AskCom com={com} />
          <AskSklad sklad={sklad} />
          <BtradeArtDataFetcher artikul={artikul} />

          {askerData && (
            <View className="flex-row items-center gap-2">
              {askerData.photo ? (
                <Image
                  source={{ uri: askerData.photo }}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
              ) : null}
              <ThemedText className="text-sm">{askerData.fullname}</ThemedText>
            </View>
          )}

          <ThemedText className="text-sm opacity-70">
            {formattedDate}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}
