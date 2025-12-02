import type { AskEvent, AskEventName } from "@/modules/asks/api/types/dto";
import {
  CalendarClock,
  CheckCircle2,
  Download,
  OctagonAlert,
  PlusCircle,
} from "lucide-react";

export const ASK_EVENT_META: Record<
  AskEventName,
  {
    iconClass: string;
    icon: typeof CalendarClock;
    accentClass: string;
    buildDescription: (event: AskEvent) => string;
  }
> = {
  create: {
    icon: PlusCircle,
    iconClass: "text-emerald-500 dark:text-emerald-300",
    accentClass:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-900/40",
    buildDescription: (event) =>
      `Запит створив ${event.userData?.fullname ?? "користувач"}.`,
  },
  pull: {
    icon: Download,
    iconClass: "text-yellow-500 dark:text-yellow-300",
    accentClass:
      "border-yellow-200 bg-yellow-50 dark:border-yellow-500/60 dark:bg-yellow-900/40",
    buildDescription: (event) => {
      const { pullDetails, userData } = event;
      if (!pullDetails) {
        return `${userData?.fullname ?? "користувач"} зняв позицію.`;
      }

      const quantPart =
        pullDetails.quant > 0 ? `${pullDetails.quant} шт.` : undefined;
      const boxPart =
        pullDetails.boxes > 0 ? `${pullDetails.boxes} кор.` : undefined;

      const palletTitle = pullDetails.palletData?.title
        ? ` · ${pullDetails.palletData.title}`
        : "";

      return `${userData?.fullname ?? "користувач"} зняв ${
        [quantPart, boxPart].filter(Boolean).join(" / ") || "позицію"
      } з палети ${palletTitle}.`;
    },
  },
  complete: {
    icon: CheckCircle2,
    iconClass: "text-gray-500 dark:text-gray-300",
    accentClass:
      "border-gray-200 bg-gray-50 dark:border-gray-500/60 dark:bg-gray-900/40",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} виконав запит.`,
  },
  reject: {
    icon: OctagonAlert,
    iconClass: "text-rose-500 dark:text-rose-300",
    accentClass:
      "border-rose-200 bg-rose-50 dark:border-rose-500/60 dark:bg-rose-900/40",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} відхилив запит.`,
  },
};
