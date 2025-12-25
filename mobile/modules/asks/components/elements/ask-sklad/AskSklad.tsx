import { HStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { sklads, type ISklads } from "@/constants/sklad";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskSkladProps {
  sklad?: "pogrebi" | "merezhi";
}

export function AskSklad({ sklad }: AskSkladProps) {
  const iconColor = useIconColor();

  if (!sklad) return null;

  return (
    <HStack className="items-center gap-2">
      <Icon family="MaterialIcons" name="warehouse" size={16} color={iconColor} />
      <ThemedText className="text-sm">
        {sklads[sklad as keyof ISklads] || sklad}
      </ThemedText>
    </HStack>
  );
}

