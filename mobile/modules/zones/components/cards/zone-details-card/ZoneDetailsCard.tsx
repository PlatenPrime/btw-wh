import { ThemedText } from "@/components/themed/themed-text";
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
        <Box className="gap-1">
          <ThemedText type="default" className="text-sm text-typography-900">
            Штрих-код: {zone.bar}
          </ThemedText>
          <ThemedText type="default" className="text-sm text-typography-900">
            Сектор: {zone.sector}
          </ThemedText>
        </Box>
      </Box>
    </View>
  );
}

