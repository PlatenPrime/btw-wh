import { ThemedHStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {
  const iconColor = useIconColor();

  if (!com) return null;

  return (
    <ThemedHStack className="items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="comment" size={16} color={iconColor} />
      <ThemedText className="text-sm italic">{com}</ThemedText>
    </ThemedHStack>
  );
}

