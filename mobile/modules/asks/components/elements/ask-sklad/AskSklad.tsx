import { ThemedHStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { sklads, type ISklads } from "@/constants/sklad";
import { useIconColor } from "@/hooks/use-icon-color";

interface AskSkladProps {
  sklad?: "pogrebi" | "merezhi";
}

export function AskSklad({ sklad }: AskSkladProps) {
  const iconColor = useIconColor();

  if (!sklad) return null;

  return (
    <ThemedHStack className="items-center gap-2">
      <ThemedIcon family="MaterialIcons" name="warehouse" size={16} color={iconColor} />
      <ThemedText className="text-sm">
        {sklads[sklad as keyof ISklads] || sklad}
      </ThemedText>
    </ThemedHStack>
  );
}

