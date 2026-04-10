import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { cn } from "@/lib/utils";

export type KonkThemeKey = "sky" | "amber" | "rose" | "lime" | "slate" | "red";

export interface KonkThemeClasses {
  banner: string;
  shadow: string;
}

const KONK_THEME_MAP: Record<KonkThemeKey, KonkThemeClasses> = {
  sky: {
    banner:
      "bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    shadow:
      "shadow-sky-200/40 dark:shadow-sky-600/30 hover:shadow-sky-300/50 dark:hover:shadow-sky-500/40",
  },
  amber: {
    banner:
      "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    shadow:
      "shadow-amber-200/40 dark:shadow-amber-600/30 hover:shadow-amber-300/50 dark:hover:shadow-amber-500/40",
  },
  rose: {
    banner:
      "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    shadow:
      "shadow-rose-200/40 dark:shadow-rose-600/30 hover:shadow-rose-300/50 dark:hover:shadow-rose-500/40",
  },
  lime: {
    banner:
      "bg-lime-500/15 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
    shadow:
      "shadow-lime-200/40 dark:shadow-lime-600/30 hover:shadow-lime-300/50 dark:hover:shadow-lime-500/40",
  },
  slate: {
    banner:
      "bg-slate-500/15 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
    shadow:
      "shadow-slate-200/40 dark:shadow-slate-600/30 hover:shadow-slate-300/50 dark:hover:shadow-slate-500/40",
  },
  red: {
    banner:
      "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    shadow:
      "shadow-red-200/40 dark:shadow-red-600/30 hover:shadow-red-300/50 dark:hover:shadow-red-500/40",
  },
};

const KONK_NAME_TO_THEME: Record<string, KonkThemeKey> = {
  sharte: "sky",
  yumi: "amber",
  balun: "rose",
  air: "lime",
  yumin: "slate",
};

export function getKonkTheme(konkName: string): KonkThemeClasses {
  const key = konkName?.trim().toLowerCase();
  const themeKey: KonkThemeKey =
    (key && KONK_NAME_TO_THEME[key]) || "slate";
  return KONK_THEME_MAP[themeKey];
}

export interface KonkBannerProps {
  konkName: string;
  imageUrl?: string | null;
  title?: string | null;
}

export function KonkBanner({
  konkName,
  imageUrl,
  title,
}: KonkBannerProps) {
  const theme = getKonkTheme(konkName);

  return (
    <div
      className={cn(
        "flex justify-center p-1 first:rounded-t-xl",
        theme.banner,
      )}
    >
      <EntityLabel
        imageUrl={imageUrl}
        title={title}
        fallbackLabel={konkName}
        imageSize="sm"
      />
    </div>
  );
}
