import type { IconWellTone } from "@/components/shared/elements/icon-well";
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
    icon: typeof CalendarClock;
    tone: IconWellTone;
    buildDescription: (event: AskEvent) => string;
  }
> = {
  create: {
    icon: PlusCircle,
    tone: "success",
    buildDescription: (event) =>
      `Запит створив ${event.userData?.fullname ?? "користувач"}.`,
  },
  pull: {
    icon: Download,
    tone: "warning",
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
    tone: "info",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} виконав запит.`,
  },
  reject: {
    icon: OctagonAlert,
    tone: "destructive",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} відхилив запит.`,
  },
};
