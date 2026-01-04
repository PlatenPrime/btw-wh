import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  const iconColor = useIconColor();

  if (!quant) return null;

  return (
    <HStack className="items-center gap-2">
      <Icon family="MaterialIcons" name="circle" size={16} color={iconColor} />
      <ThemedText className="text-sm">{quant}</ThemedText>
    </HStack>
  );
}

