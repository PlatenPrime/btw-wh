import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import type { IPos } from "@/modules/poses/api/types";
import { cn } from "@/lib/utils";

interface SkladListPosViewProps {
  pos: IPos;
  onPress?: () => void;
}

export function SkladListPosView({ pos, onPress }: SkladListPosViewProps) {
  const isBoxesEmpty = pos.boxes === 0;
  const isQuantEmpty = pos.quant === 0;
  const emptyBoxesColor = isBoxesEmpty ? "text-error-600" : "text-typography-900";
  const emptyQuantColor = isQuantEmpty ? "text-error-600" : "text-typography-900";
  const containerColor = isBoxesEmpty || isQuantEmpty ? "bg-error-50/25" : "bg-background-0";
  const containerBorderColor = isBoxesEmpty || isQuantEmpty ? "border-error-500/25" : "border-outline-50";

  return (
    <ThemedPressable onPress={onPress}>
      <ThemedBox className={cn("px-3 py-2 p-2 rounded-lg border", containerColor, containerBorderColor)}>
        <ThemedHStack className="items-center">
          {/* Название паллеты слева */}
          <ThemedBox className="flex-1 min-w-0">
            <ThemedText type="defaultSemiBold" numberOfLines={1}>
              {pos.palletData?.title || "Невідома палета"}
            </ThemedText>
          </ThemedBox>
          {/* Количество коробок по центру */}
          <ThemedBox className="flex-1 items-center">
            <ThemedText
              type="default"
              className={emptyBoxesColor}
            >
              {pos.boxes || 0}
            </ThemedText>
          </ThemedBox>
          {/* Количество товара справа */}
          <ThemedBox className="flex-1 items-end">
            <ThemedText
              type="default"
              className={emptyQuantColor}
            >
              {pos.quant || 0}
            </ThemedText>
          </ThemedBox>
        </ThemedHStack>
      </ThemedBox>
    </ThemedPressable>
  );
}

