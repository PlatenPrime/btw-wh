import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { HStack, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { formatDateTime } from "@/modules/asks/utils/format-date";
import { ASK_EVENT_META } from "../../constants/askEventMeta";

interface AskEventProps {
  event: AskEvent;
  index: number;
}

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

  return (
    <ThemedView
      key={event._id ?? `${event.eventName}-${event.date}-${index}`}
      className={`rounded-md border px-3 py-2 bg-${meta.accentBgColor} border-${meta.accentBorderColor}`}
      style={{
        backgroundColor: card.bg,
        borderColor: card.border,
      }}
    >
      <VStack className="gap-1">
        <HStack className="items-center gap-2">
          <Icon
            family="MaterialIcons"
            name={meta.iconName}
            size={16}
            color={iconColor}
          />
          <ThemedText type="default" className="text-sm opacity-70">
            {formatDateTime(event.date)}
          </ThemedText>
        </HStack>
        <ThemedText type="default" className="text-sm">
          {meta.buildDescription(event) ??
            `${event.userData?.fullname ?? "Користувач"} зафіксував подію.`}
        </ThemedText>
      </VStack>
    </ThemedView>
  );
}
