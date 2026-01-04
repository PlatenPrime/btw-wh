import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedHStack, ThemedVStack } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { hexToRgba } from "@/utils/color-utils";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import { ASK_EVENT_META } from "../../constants/askEventMeta";

interface AskEventProps {
  event: AskEvent;
  index: number;
}

/**
 * Маппинг accent цветов на цвета из iconColors
 * accentBgColor и accentBorderColor из meta не определены в нашей системе токенов,
 * поэтому используем соответствующие цвета из iconColors с opacity
 */
const accentColorMap: Record<string, keyof typeof SemanticColors.iconColors> = {
  "emerald-50": "emerald",
  "emerald-200": "emerald",
  "yellow-50": "yellow",
  "yellow-200": "yellow",
  "gray-50": "typography" as any, // Используем typography как fallback
  "gray-200": "typography" as any,
  "rose-50": "rose",
  "rose-200": "rose",
};

export function AskEvent({ event, index }: AskEventProps) {
  const meta = ASK_EVENT_META[event.eventName];
  const { card, text } = useThemeColors();

  if (!meta) {
    return null;
  }

  const iconColor =
    SemanticColors.iconColors[
      meta.iconColor as keyof typeof SemanticColors.iconColors
    ] || text.icon;

  // Получаем цвета для accentBg и accentBorder через iconColors с opacity
  const accentBgColorKey = accentColorMap[meta.accentBgColor];
  const accentBorderColorKey = accentColorMap[meta.accentBorderColor];
  
  const accentBgColor = accentBgColorKey && accentBgColorKey !== "typography"
    ? hexToRgba(SemanticColors.iconColors[accentBgColorKey], 0.1)
    : card.bg;
    
  const accentBorderColor = accentBorderColorKey && accentBorderColorKey !== "typography"
    ? hexToRgba(SemanticColors.iconColors[accentBorderColorKey], 0.3)
    : card.border;

  return (
    <ThemedView
      key={event._id ?? `${event.eventName}-${event.date}-${index}`}
      className="rounded-md border p-2"
      style={{
        backgroundColor: accentBgColor,
        borderColor: accentBorderColor,
      }}
    >
      <ThemedVStack className="gap-1">
        <ThemedHStack className="items-center gap-2">
          <ThemedIcon
            family="MaterialIcons"
            name={meta.iconName}
            size={16}
            color={iconColor}
          />
          <ThemedText type="default" className="text-sm opacity-70">
            {formatDateTime(event.date)}
          </ThemedText>
        </ThemedHStack>
        <ThemedText type="default" className="text-sm">
          {meta.buildDescription(event) ??
            `${event.userData?.fullname ?? "Користувач"} зафіксував подію.`}
        </ThemedText>
      </ThemedVStack>
    </ThemedView>
  );
}
