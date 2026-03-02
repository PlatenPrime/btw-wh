import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import type { CardAction } from "@/components/shared/card-actions/types";
import { AnalogImageLink } from "@/components/shared/analog-image-link/AnalogImageLink";
import { Card } from "@/components/ui/card";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { AnalogDto } from "@/modules/analogs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { cn } from "@/lib/utils";

interface AnalogGridCardViewProps {
  analog: AnalogDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  actions: CardAction[];
}

type KonkThemeKey = "sky" | "amber" | "rose" | "lime" | "slate";

interface KonkThemeClasses {
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
};

const KONK_NAME_TO_THEME: Record<string, KonkThemeKey> = {
  sharte: "sky",
  yumi: "amber",
  balun: "rose",
  air: "lime",
};

function getKonkTheme(konkName: string): KonkThemeClasses {
  const key = konkName?.trim().toLowerCase();
  const themeKey: KonkThemeKey =
    (key && KONK_NAME_TO_THEME[key]) || "slate";
  return KONK_THEME_MAP[themeKey];
}

export function AnalogGridCardView({
  analog,
  konk,
  prod,
  actions,
}: AnalogGridCardViewProps) {
  const theme = getKonkTheme(analog.konkName);

  return (
    <Card
      className={cn(
        "flex flex-col gap-2 overflow-hidden p-0 transition-shadow",
        theme.shadow,
      )}
    >
      <div
        className={cn(
          "flex justify-center py-1.5 first:rounded-t-xl",
          theme.banner,
        )}
      >
        <EntityLabel
          imageUrl={konk?.imageUrl}
          title={konk?.title}
          fallbackLabel={analog.konkName}
          imageSize="sm"
        />
      </div>

      <div className="flex flex-col items-center gap-2 px-2">
        <div className="flex min-w-0 items-start justify-center gap-2">
          <AnalogImageLink
            analog={analog}
            to={`/arts/analogs/${analog._id}`}
          />
          <div className="shrink-0">
            <CardActionsMenu
              actions={actions}
              orientation="horizontal"
              size="sm"
              align="end"
            />
          </div>
        </div>


      </div>

      <div className="text-muted-foreground flex justify-center pb-2 text-xs">
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={analog.prodName}
          imageSize="sm"
        />
      </div>
    </Card>
  );
}
