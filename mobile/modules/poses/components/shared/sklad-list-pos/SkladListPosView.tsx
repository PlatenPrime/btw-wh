import { Box, HStack, Pressable } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import type { IPos } from "@/modules/poses/api/types";

interface SkladListPosViewProps {
  pos: IPos;
  onPress?: () => void;
}

export function SkladListPosView({ pos, onPress }: SkladListPosViewProps) {
  const isBoxesEmpty = pos.boxes === 0;
  const isQuantEmpty = pos.quant === 0;

  return (
    <Pressable onPress={onPress}>
      <Box className="px-3 py-2 p-2 rounded-lg border border-outline-100 bg-background-0">
        <HStack className="items-center">
          {/* Название паллеты слева */}
          <Box className="flex-1 min-w-0">
            <ThemedText type="defaultSemiBold" numberOfLines={1}>
              {pos.palletData?.title || "Невідома палета"}
            </ThemedText>
          </Box>
          {/* Количество коробок по центру */}
          <Box className="flex-1 items-center">
            <ThemedText
              type="default"
              className={isBoxesEmpty ? "text-error-600" : ""}
            >
              {pos.boxes || 0}
            </ThemedText>
          </Box>
          {/* Количество товара справа */}
          <Box className="flex-1 items-end">
            <ThemedText
              type="default"
              className={isQuantEmpty ? "text-error-600" : ""}
            >
              {pos.quant || 0}
            </ThemedText>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
}

