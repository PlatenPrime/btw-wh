import { GlassCard } from "@/components/shared/glass-card";
import { ThemedText, ThemedVStack } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { AskEvent as AskEventComponent } from "./components/ask-event/AskEvent";
import { AskEventsPullInfo } from "./components/ask-events-pull-info/AskEventsPullInfo";

interface AskEventsProps {
  events: AskEvent[];
  pullQuant?: number;
  pullBox?: number;
  pullBoxes?: number;
}

export function AskEvents({
  events,
  pullQuant,
  pullBox,
  pullBoxes,
}: AskEventsProps) {
  const totalQuant = pullQuant ?? 0;
  const totalBoxes = pullBox ?? pullBoxes ?? 0;

  return (
    <GlassCard className="p-4">
      <ThemedVStack className="gap-3">
        <AskEventsPullInfo totalQuant={totalQuant} totalBoxes={totalBoxes} />

        <ThemedVStack className="gap-2">
          {events.length === 0 && (
            <ThemedView className="rounded-md border border-dashed px-3 py-2">
              <ThemedText type="default" className="text-sm opacity-70">
                Подій ще не було зафіксовано.
              </ThemedText>
            </ThemedView>
          )}

          {events.map((event, index) => {
            return (
              <AskEventComponent
                key={event._id ?? `${event.eventName}-${event.date}-${index}`}
                event={event}
                index={index}
              />
            );
          })}
        </ThemedVStack>
      </ThemedVStack>
    </GlassCard>
  );
}
