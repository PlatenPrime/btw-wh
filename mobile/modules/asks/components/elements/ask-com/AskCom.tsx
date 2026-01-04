import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {
  const iconColor = useIconColor();

  if (!com) return null;

  return (
    <HStack className="items-center gap-2">
      <Icon family="MaterialIcons" name="comment" size={16} color={iconColor} />
      <ThemedText className="text-sm italic">{com}</ThemedText>
    </HStack>
  );
}

