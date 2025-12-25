import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";

interface AskQuantProps {
  quant: number | undefined;
}

export function AskQuant({ quant }: AskQuantProps) {
  if (!quant) return null;

  return (
    <HStack className="items-center gap-2">
      <Icon family="MaterialIcons" name="circle" size={16} />
      <ThemedText className="text-xs">{quant}</ThemedText>
    </HStack>
  );
}

