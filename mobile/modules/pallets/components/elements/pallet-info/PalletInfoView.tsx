import { Box, HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";

interface PalletInfoViewProps {
  totalPositions: number;
  totalBoxes: number;
}

export function PalletInfoView({
  totalPositions,
  totalBoxes,
}: PalletInfoViewProps) {
  const iconColor = useIconColor();
  
  return (
    <HStack className="items-center justify-center gap-4">
      <HStack className="items-center gap-1">
        <Icon 
          family="MaterialIcons" 
          name="description" 
          size={16} 
          color={iconColor}
        />
        <ThemedText type="defaultSemiBold" className="text-base">
          {totalPositions}
        </ThemedText>
      </HStack>

      <HStack className="items-center gap-1">
        <Icon 
          family="Feather" 
          name="box" 
          size={16} 
          color={iconColor}
        />
        <ThemedText type="defaultSemiBold" className="text-base">
          {totalBoxes}
        </ThemedText>
      </HStack>
    </HStack>
  );
}

