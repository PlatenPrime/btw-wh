import { ThemedText } from "@/components/themed-text";
import { Box } from "@/components/ui";
import { View } from "react-native";
import type { ZoneDto } from "@/modules/zones/api/types/dto";

interface ZoneDetailsCardProps {
  zone: ZoneDto;
}

export function ZoneDetailsCard({ zone }: ZoneDetailsCardProps) {
  return (
    <View className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <Box className="gap-2">
        <ThemedText type="title" className="text-xl">
          Зона: {zone.title}
        </ThemedText>
        <Box className="gap-1">
          <ThemedText type="default" className="text-sm text-typography-500">
            Штрих-код: {zone.bar}
          </ThemedText>
          <ThemedText type="default" className="text-sm text-typography-500">
            Сектор: {zone.sector}
          </ThemedText>
        </Box>
      </Box>
    </View>
  );
}

