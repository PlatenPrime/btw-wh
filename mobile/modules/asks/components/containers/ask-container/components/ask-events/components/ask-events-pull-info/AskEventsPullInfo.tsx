import { ThemedText } from "@/components/themed-text";
import { HStack } from "@/components/ui";

interface AskEventsPullInfoProps {
  totalQuant: number;
  totalBoxes?: number;
}

export function AskEventsPullInfo({
  totalQuant,
  totalBoxes,
}: AskEventsPullInfoProps) {
  return (
    <HStack className="items-center gap-2">
      <ThemedText type="defaultSemiBold" className="text-base">
        Знято: {totalQuant} шт. / {totalBoxes} кор.
      </ThemedText>
    </HStack>
  );
}

