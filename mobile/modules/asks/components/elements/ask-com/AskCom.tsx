import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";

interface AskComProps {
  com: string | undefined;
}

export function AskCom({ com }: AskComProps) {
  if (!com) return null;

  return (
    <HStack className="items-center gap-2">
      <Icon family="MaterialIcons" name="comment" size={16} />
      <ThemedText className="text-xs italic">{com}</ThemedText>
    </HStack>
  );
}

