import { CalendarClock, CheckCircle2, FolderOpen, OctagonAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AskEvent, AskEventName } from "@/modules/asks/api/types/dto";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";

interface AskEventsProps {
  events: AskEvent[];
  pullQuant?: number;
  pullBox?: number;
  pullBoxes?: number;
}

const EVENT_META: Record<
  AskEventName,
  {
    label: string;
    iconClass: string;
    icon: typeof CalendarClock;
    accentClass: string;
    buildDescription: (event: AskEvent) => string;
  }
> = {
  create: {
    label: "Створено",
    icon: FolderOpen,
    iconClass: "text-slate-500",
    accentClass: "border-slate-200 bg-slate-50",
    buildDescription: (event) =>
      `Запис створив ${event.userData?.fullname ?? "користувач"}.`,
  },
  pull: {
    label: "Підтягування",
    icon: CalendarClock,
    iconClass: "text-sky-500",
    accentClass: "border-sky-200 bg-sky-50",
    buildDescription: (event) => {
      const { pullDetails, userData } = event;
      if (!pullDetails) {
        return `${userData?.fullname ?? "користувач"} підтягнув позицію.`;
      }

      const quantPart =
        pullDetails.quant > 0 ? `${pullDetails.quant} шт.` : undefined;
      const boxPart =
        pullDetails.boxes > 0 ? `${pullDetails.boxes} кор.` : undefined;

      const palletTitle = pullDetails.palletData?.title
        ? ` · ${pullDetails.palletData.title}`
        : "";

      return `${userData?.fullname ?? "користувач"} підтягнув ${
        [quantPart, boxPart].filter(Boolean).join(" / ") || "позицію"
      }${palletTitle}.`;
    },
  },
  complete: {
    label: "Виконано",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    accentClass: "border-emerald-200 bg-emerald-50",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} завершив запит.`,
  },
  reject: {
    label: "Відхилено",
    icon: OctagonAlert,
    iconClass: "text-rose-500",
    accentClass: "border-rose-200 bg-rose-50",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} відхилив запит.`,
  },
};

export function AskEvents({
  events,
  pullQuant,
  pullBox,
  pullBoxes,
}: AskEventsProps) {
  const totalQuant = pullQuant ?? 0;
  const totalBoxes = pullBox ?? pullBoxes ?? 0;

  return (
    <Card className="p-1">
      <CardContent className="grid gap-3">
        <header className="grid gap-2">
          <h3 className="text-sm font-semibold">Хронологія подій</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-xs text-sky-900">
              Підтягнуто шт.:{" "}
              <span className="font-semibold text-sky-700">{totalQuant}</span>
            </div>
            <div className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs text-indigo-900">
              Підтягнуто короб.:{" "}
              <span className="font-semibold text-indigo-700">{totalBoxes}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-2">
          {events.length === 0 && (
            <div className="rounded-md border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-500">
              Подій ще не було зафіксовано.
            </div>
          )}
          {events.map((event, index) => {
            const meta = EVENT_META[event.eventName];
            const IconComponent = meta?.icon ?? CalendarClock;

            return (
              <div
                key={event._id ?? `${event.eventName}-${event.date}-${index}`}
                className={cn(
                  "rounded-md border px-3 py-2",
                  meta?.accentClass ?? "border-slate-200 bg-slate-50",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <IconComponent
                      className={cn("h-4 w-4", meta?.iconClass)}
                    />
                    <span className="text-xs font-medium">
                      {meta?.label ?? "Подія"}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {formatDate(event.date)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {meta?.buildDescription(event) ??
                    `${event.userData?.fullname ?? "Користувач"} зафіксував подію.`}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

