import type { AskEvent, AskEventName } from "@/modules/asks/api/types/dto";

export type AskEventIconName =
  | "add-circle"
  | "download"
  | "check-circle"
  | "cancel";

export const ASK_EVENT_META: Record<
  AskEventName,
  {
    iconName: AskEventIconName;
    iconColor: string;
    accentBgColor: string;
    accentBorderColor: string;
    buildDescription: (event: AskEvent) => string;
  }
> = {
  create: {
    iconName: "add-circle",
    iconColor: "emerald",
    accentBgColor: "emerald-50",
    accentBorderColor: "emerald-200",
    buildDescription: (event) =>
      `Запит створив ${event.userData?.fullname ?? "користувач"}.`,
  },
  pull: {
    iconName: "download",
    iconColor: "yellow",
    accentBgColor: "yellow-50",
    accentBorderColor: "yellow-200",
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
    iconName: "check-circle",
    iconColor: "blue",
    accentBgColor: "gray-50",
    accentBorderColor: "gray-200",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} виконав запит.`,
  },
  reject: {
    iconName: "cancel",
    iconColor: "rose",
    accentBgColor: "rose-50",
    accentBorderColor: "rose-200",
    buildDescription: (event) =>
      `${event.userData?.fullname ?? "користувач"} відхилив запит.`,
  },
};

