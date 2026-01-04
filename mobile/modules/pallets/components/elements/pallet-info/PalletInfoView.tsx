import { ThemedHStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
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
    <ThemedHStack className="items-center justify-center gap-4">
      <ThemedHStack className="items-center gap-1">
        <ThemedIcon 
          family="MaterialIcons" 
          name="description" 
          size={16} 
          color={iconColor}
        />
        <ThemedText type="defaultSemiBold" className="text-base">
          {totalPositions}
        </ThemedText>
      </ThemedHStack>

      <ThemedHStack className="items-center gap-1">
        <ThemedIcon 
          family="Feather" 
          name="box" 
          size={16} 
          color={iconColor}
        />
        <ThemedText type="defaultSemiBold" className="text-base">
          {totalBoxes}
        </ThemedText>
      </ThemedHStack>
    </ThemedHStack>
  );
}

