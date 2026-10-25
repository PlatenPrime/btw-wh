const SLICE_TIMEZONE = "Europe/Kiev";

/** С цього часу за Києвом можна відкрити зріз наступного календарного дня. */
const SLICE_OPEN_HOUR = 20;

const kyivPartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: SLICE_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  hourCycle: "h23",
});

function kyivYmdAndHour(d: Date): { ymd: string; hour: number } {
  const parts = kyivPartsFormatter.formatToParts(d);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  if (
    !year ||
    !month ||
    !day ||
    !Number.isFinite(hour) ||
    hour < 0 ||
    hour > 23
  ) {
    throw new Error("openKyivSliceYmd: could not read Europe/Kiev");
  }
  return { ymd: `${year}-${month}-${day}`, hour };
}

function nextYmd(ymd: string): string {
  const [yearStr, monthStr, dayStr] = ymd.split("-");
  const next = new Date(
    Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr) + 1),
  );
  const year = next.getUTCFullYear();
  const month = String(next.getUTCMonth() + 1).padStart(2, "0");
  const day = String(next.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Останній день зрізу, який уже можна відкрити.
 * Збігається з серверним `toOpenKyivSliceDate`: з 20:00 Київ — наступний день.
 */
export function openKyivSliceYmd(now: Date = new Date()): string {
  const { ymd, hour } = kyivYmdAndHour(now);
  return hour >= SLICE_OPEN_HOUR ? nextYmd(ymd) : ymd;
}
