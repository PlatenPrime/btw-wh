import { ThemedHStack, ThemedIcon, ThemedVStack } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";

import { SemanticColors } from "@/constants/theme";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import { useTheme } from "@/providers/theme-provider";
import { hexToRgba } from "@/utils/color-utils";
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
const accentColorMap: Record<
  string,
  keyof typeof SemanticColors.iconColors | undefined
> = {
  "emerald-50": "emerald",
  "emerald-200": "emerald",
  "yellow-50": "yellow",
  "yellow-200": "yellow",
  "blue-50": "blue",
  "blue-200": "blue",
  "rose-50": "rose",
  "rose-200": "rose",
};

export function AskEvent({ event, index }: AskEventProps) {
  const meta = ASK_EVENT_META[event.eventName];
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  if (!meta) {
    return null;
  }

  const cardBg = SemanticColors.card.bg[theme];
  const cardBorder = SemanticColors.card.border[theme];
  const textIcon = theme === "dark" ? "#A3A3A3" : "#687076";

  const iconColor =
    SemanticColors.iconColors[
      meta.iconColor as keyof typeof SemanticColors.iconColors
    ] || textIcon;

  // Получаем цвета для accentBg и accentBorder через iconColors с opacity
  const accentBgColorKey = accentColorMap[meta.accentBgColor];
  const accentBorderColorKey = accentColorMap[meta.accentBorderColor];

  const accentBgColor = accentBgColorKey
    ? hexToRgba(SemanticColors.iconColors[accentBgColorKey], 0.1)
    : cardBg;

  const accentBorderColor = accentBorderColorKey
    ? hexToRgba(SemanticColors.iconColors[accentBorderColorKey], 0.3)
    : cardBorder;

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
