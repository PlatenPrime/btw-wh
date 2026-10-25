import { Card, CardContent } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { AskEvent } from "@/modules/asks/api/types/dto";
import { AskEventComponent } from "./components/ask-event/AskEvent";
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
    <Card className="p-2">
      <CardContent className="grid gap-2 p-0">
        <div className="grid gap-2">
          {events.length === 0 ? (
            <p className={typography.caption}>Подій ще не було зафіксовано.</p>
          ) : (
            events.map((event, index) => (
              <AskEventComponent
                key={event._id ?? `${event.eventName}-${event.date}-${index}`}
                event={event}
              />
            ))
          )}
        </div>

        <footer className="border-t border-border pt-2">
          <AskEventsPullInfo totalQuant={totalQuant} totalBoxes={totalBoxes} />
        </footer>
      </CardContent>
    </Card>
  );
}
