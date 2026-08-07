import {
  ThemedHStack,
  ThemedIcon,
  ThemedText,
  ThemedVStack,
} from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import type { ReactNode } from "react";

interface AskPullPositionCardViewProps {
  artZone: string | null;
  plannedQuant: number | null;
  children: ReactNode;
}

export function AskPullPositionCardView({
  artZone,
  plannedQuant,
  children,
}: AskPullPositionCardViewProps) {
  const zoneLabel = artZone ?? "—";

  return (
    <ThemedVStack className="gap-1.5">
      <ThemedHStack className="flex-wrap items-center gap-3 px-1">
        <ThemedHStack className="items-center gap-1.5 flex-1 min-w-0">
          <ThemedIcon
            family="MaterialIcons"
            name="place"
            size={14}
            color={SemanticColors.iconColors.amber}
          />
          <ThemedText
            type="default"
            className="text-xs flex-1"
            numberOfLines={1}
          >
            {zoneLabel}
          </ThemedText>
        </ThemedHStack>
        {plannedQuant !== null ? (
          <ThemedHStack className="items-center gap-1">
            <ThemedIcon
              family="MaterialIcons"
              name="arrow-downward"
              size={14}
              color={SemanticColors.iconColors.green}
            />
            <ThemedText type="default" className="text-xs">
              {plannedQuant}
            </ThemedText>
          </ThemedHStack>
        ) : null}
      </ThemedHStack>
      {children}
    </ThemedVStack>
  );
}
