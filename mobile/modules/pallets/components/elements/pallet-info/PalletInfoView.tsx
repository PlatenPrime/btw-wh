import { Box, HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";

interface PalletInfoViewProps {
  totalPositions: number;
  totalBoxes: number;
}

export function PalletInfoView({
  totalPositions,
  totalBoxes,
}: PalletInfoViewProps) {
  return (
    <HStack className="items-center justify-center gap-4">
      <HStack className="items-center gap-1">
        <Icon 
          family="MaterialIcons" 
          name="description" 
          size={16} 
          color="#374151"
        />
        <ThemedText type="defaultSemiBold" className="text-sm">
          {totalPositions}
        </ThemedText>
      </HStack>

      <HStack className="items-center gap-1">
        <Icon 
          family="MaterialIcons" 
          name="inventory" 
          size={16} 
          color="#374151"
        />
        <ThemedText type="defaultSemiBold" className="text-sm">
          {totalBoxes}
        </ThemedText>
      </HStack>
    </HStack>
  );
}

