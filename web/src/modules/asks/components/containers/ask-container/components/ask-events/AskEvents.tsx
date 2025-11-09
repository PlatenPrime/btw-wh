import { Card, CardContent } from "@/components/ui/card";
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
        <header className="grid gap-2">
          <AskEventsPullInfo totalQuant={totalQuant} totalBoxes={totalBoxes} />
        </header>

        <div className="grid gap-2">
          {events.length === 0 && (
            <div className="rounded-md border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-500">
              Подій ще не було зафіксовано.
            </div>
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
        </div>
      </CardContent>
    </Card>
  );
}
