import { ThemedText } from "@/components/themed-text";

interface AskEventsPullInfoProps {
  totalQuant: number;
  totalBoxes?: number;
}

export function AskEventsPullInfo({
  totalQuant,
  totalBoxes,
}: AskEventsPullInfoProps) {
  return (
    <ThemedText type="defaultSemiBold" className="text-base text-center">
      Знято: {totalQuant} шт. / {totalBoxes} кор.
    </ThemedText>
  );
}
