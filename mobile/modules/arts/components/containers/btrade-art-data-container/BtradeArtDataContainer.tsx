import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { BtradeArtDataContainerView } from "./BtradeArtDataContainerView";
import type { BtradeArtDataContainerProps } from "../../fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

export function BtradeArtDataContainer({
  artikul,
  exists,
  message,
  data,
  onRetry,
}: BtradeArtDataContainerProps) {
  if (!exists) {
    return (
      <ThemedView className="p-3 rounded-lg border border-dashed">
        <ThemedText type="defaultSemiBold" className="text-center mb-1">
          Дані про товар не знайдені
        </ThemedText>
        <ThemedText type="default" className="text-center text-sm opacity-70">
          {message || `Товар з артикулом ${artikul} відсутній на sharik.ua`}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!data) {
    return (
      <ThemedText type="default" className="text-sm opacity-70">
        Дані тимчасово недоступні
      </ThemedText>
    );
  }

  return <BtradeArtDataContainerView data={data} />;
}

