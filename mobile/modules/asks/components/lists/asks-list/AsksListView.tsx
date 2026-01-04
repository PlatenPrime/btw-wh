import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox } from "@/components/themed";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCard } from "@/modules/asks/components/cards/asks-list-card/AsksListCard";

interface AsksListViewProps {
  asks: AskDto[];
}

export function AsksListView({ asks }: AsksListViewProps) {
  if (asks.length === 0) {
    return (
      <ThemedBox className="py-8">
        <ThemedText type="default" className="text-center">
          Немає запитів для відображення
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <View className="gap-2">
      {asks.map((ask) => (
        <AsksListCard key={ask._id} ask={ask} />
      ))}
    </View>
  );
}

