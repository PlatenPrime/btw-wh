import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import type { IPos } from "@/modules/poses/api/types";

interface SkladListPosViewProps {
  pos: IPos;
  onPress?: () => void;
}

export function SkladListPosView({ pos, onPress }: SkladListPosViewProps) {
  const isBoxesEmpty = pos.boxes === 0;
  const isQuantEmpty = pos.quant === 0;

  return (
    <ThemedPressable onPress={onPress}>
      <ThemedBox className="px-3 py-2 p-2 rounded-lg border border-outline-100 bg-background-0">
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
              className={isBoxesEmpty ? "text-error-600" : ""}
            >
              {pos.boxes || 0}
            </ThemedText>
          </ThemedBox>
          {/* Количество товара справа */}
          <ThemedBox className="flex-1 items-end">
            <ThemedText
              type="default"
              className={isQuantEmpty ? "text-error-600" : ""}
            >
              {pos.quant || 0}
            </ThemedText>
          </ThemedBox>
        </ThemedHStack>
      </ThemedBox>
    </ThemedPressable>
  );
}

