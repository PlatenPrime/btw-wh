import { ThemedText } from "@/components/themed/themed-text";
import { Box, HStack, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import type { WarehouseData } from "@/modules/poses/api/types";
import type { ReactNode } from "react";

interface SkladPosesListViewProps {
  skladData: WarehouseData;
  title: string;
  renderPos: (
    pos: { exists: boolean; message: string; data: WarehouseData["poses"][0] },
    additionalProps?: Record<string, unknown>
  ) => ReactNode;
  additionalProps?: Record<string, unknown>;
}

export function SkladPosesListView({
  skladData,
  title,
  renderPos,
  additionalProps,
}: SkladPosesListViewProps) {
  const iconColor = useIconColor();

  if (!skladData.poses?.length) {
    return (
      <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
        <ThemedText type="default" className="text-center">
          На складі {title} немає позицій з цим артикулом
        </ThemedText>
      </Box>
    );
  }

  return (
    <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <VStack className="gap-2">
        <HStack className="items-center">
          {/* Название склада слева */}
          <Box className="flex-1">
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
          </Box>
          {/* Количество коробок по центру */}
          <Box className="flex-1 items-center">
            <HStack className="items-center gap-1">
              <Icon family="Feather" name="box" size={14} color={iconColor} />
              <ThemedText type="default" className="font-semibold">
                {skladData.boxes || 0}
              </ThemedText>
            </HStack>
          </Box>
          {/* Количество товара справа */}
          <Box className="flex-1 items-end">
            <HStack className="items-center gap-1">
              <Icon
                family="MaterialIcons"
                name="radio-button-unchecked"
                size={14}
                color={iconColor}
              />
              <ThemedText type="default" className="font-semibold">
                {skladData.quant || 0}
              </ThemedText>
            </HStack>
          </Box>
        </HStack>

        {skladData.poses?.length > 0 && (
          <VStack className="gap-4">
            {skladData.poses.map((pos) => (
              <Box key={pos._id}>
                {renderPos(
                  { exists: true, message: "", data: pos },
                  additionalProps
                )}
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
