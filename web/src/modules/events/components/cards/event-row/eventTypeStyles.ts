import type { EventType } from "@/modules/events/api/types";

interface EventTypeStyle {
  card: string;
  badge: string;
  label: string;
}

const EVENT_TYPE_STYLES: Record<EventType, EventTypeStyle> = {
  create: {
    card: [
      "border-emerald-300/70 bg-emerald-50/70",
      "shadow-emerald-300/25 hover:shadow-emerald-400/35",
      "dark:border-emerald-500/45 dark:bg-emerald-950/10",
      "dark:shadow-emerald-700/30 dark:hover:shadow-emerald-600/40",
    ].join(" "),
    badge: [
      "border-emerald-300/80 bg-emerald-100/90 text-emerald-800",
      "dark:border-emerald-500/50 dark:bg-emerald-900/60 dark:text-emerald-200",
    ].join(" "),
    label: "create",
  },
  edit: {
    card: [
      "border-sky-300/70 bg-sky-50/70",
      "shadow-sky-300/25 hover:shadow-sky-400/35",
      "dark:border-sky-500/45 dark:bg-sky-950/10",
      "dark:shadow-sky-700/30 dark:hover:shadow-sky-600/40",
    ].join(" "),
    badge: [
      "border-sky-300/80 bg-sky-100/90 text-sky-800",
      "dark:border-sky-500/50 dark:bg-sky-900/60 dark:text-sky-200",
    ].join(" "),
    label: "edit",
  },
  delete: {
    card: [
      "border-rose-300/70 bg-rose-50/70",
      "shadow-rose-300/25 hover:shadow-rose-400/35",
      "dark:border-rose-500/45 dark:bg-rose-950/10",
      "dark:shadow-rose-700/30 dark:hover:shadow-rose-600/40",
    ].join(" "),
    badge: [
      "border-rose-300/80 bg-rose-100/90 text-rose-800",
      "dark:border-rose-500/50 dark:bg-rose-900/60 dark:text-rose-200",
    ].join(" "),
    label: "delete",
  },
  other: {
    card: [
      "border-border/80 bg-muted/40",
      "shadow-muted-foreground/10 hover:shadow-muted-foreground/15",
      "dark:border-border/60 dark:bg-muted/10",
      "dark:shadow-black/20 dark:hover:shadow-black/30",
    ].join(" "),
    badge: [
      "border-border bg-muted text-muted-foreground",
      "dark:border-border/70 dark:bg-muted/40 dark:text-muted-foreground",
    ].join(" "),
    label: "other",
  },
};

const NEUTRAL_STYLE: EventTypeStyle = EVENT_TYPE_STYLES.other;

export function getEventTypeStyle(
  type: EventType | undefined,
): EventTypeStyle {
  if (!type) return NEUTRAL_STYLE;
  return EVENT_TYPE_STYLES[type] ?? NEUTRAL_STYLE;
}
