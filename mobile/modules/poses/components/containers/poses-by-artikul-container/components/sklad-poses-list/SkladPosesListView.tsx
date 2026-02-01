import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedVStack, ThemedIcon } from "@/components/themed";
import { GlassCard } from "@/components/shared/glass-card";
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
      <GlassCard className="p-4">
        <ThemedText type="default" className="text-center">
          На складі {title} немає позицій з цим артикулом
        </ThemedText>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4">
      <ThemedVStack className="gap-2">
        <ThemedHStack className="items-center">
          {/* Название склада слева */}
          <ThemedBox className="flex-1">
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
          </ThemedBox>
          {/* Количество коробок по центру */}
          <ThemedBox className="flex-1 items-center">
            <ThemedHStack className="items-center gap-1">
              <ThemedIcon family="Feather" name="box" size={14} color={iconColor} />
              <ThemedText type="default" className="font-semibold">
                {skladData.boxes || 0}
              </ThemedText>
            </ThemedHStack>
          </ThemedBox>
          {/* Количество товара справа */}
          <ThemedBox className="flex-1 items-end">
            <ThemedHStack className="items-center gap-1">
              <ThemedIcon
                family="MaterialIcons"
                name="radio-button-unchecked"
                size={14}
                color={iconColor}
              />
              <ThemedText type="default" className="font-semibold">
                {skladData.quant || 0}
              </ThemedText>
            </ThemedHStack>
          </ThemedBox>
        </ThemedHStack>

        {skladData.poses?.length > 0 && (
          <ThemedVStack className="gap-4">
            {skladData.poses.map((pos) => (
              <ThemedBox key={pos._id}>
                {renderPos(
                  { exists: true, message: "", data: pos },
                  additionalProps
                )}
              </ThemedBox>
            ))}
          </ThemedVStack>
        )}
      </ThemedVStack>
    </GlassCard>
  );
}
