import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Box } from "@/components/ui";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCard } from "@/modules/asks/components/cards/asks-list-card/AsksListCard";

interface AsksListViewProps {
  asks: AskDto[];
}

export function AsksListView({ asks }: AsksListViewProps) {
  if (asks.length === 0) {
    return (
      <Box className="py-8">
        <ThemedText type="default" className="text-center">
          Немає запитів для відображення
        </ThemedText>
      </Box>
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

