import { ThemedVStack } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
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
    <ThemedView className="p-3 rounded-lg border bg-background-0 border-outline-50">
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
    </ThemedView>
  );
}
