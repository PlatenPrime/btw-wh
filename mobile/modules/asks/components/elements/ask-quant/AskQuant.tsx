import { ThemedHStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  const iconColor = useIconColor();

  if (!quant) return null;

  return (
    <ThemedHStack className="items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="circle" size={16} color={iconColor} />
      <ThemedText className="text-sm">{quant}</ThemedText>
    </ThemedHStack>
  );
}

