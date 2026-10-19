import {
  IconWell,
  type IconWellTone,
} from "@/components/shared/elements/icon-well";
import { Image } from "@/components/shared/media/image/Image";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface MetricChipProps {
  icon: LucideIcon;
  /** When set, replaces IconWell with the entity image (same well size). */
  imageUrl?: string | null;
  tone?: IconWellTone;
  label: string;
  value: ReactNode;
  className?: string;
}

function MetricChipLeading({
  icon,
  imageUrl,
  tone,
}: {
  icon: LucideIcon;
  imageUrl?: string | null;
  tone: IconWellTone;
}) {
  const trimmedImageUrl = imageUrl?.trim();

  if (trimmedImageUrl) {
    return (
      <span
        className="bg-muted inline-flex size-8 shrink-0 overflow-hidden rounded-lg"
        aria-hidden
      >
        <Image
          src={trimmedImageUrl}
          alt=""
          className="size-full object-contain"
          height={32}
          width={32}
        />
      </span>
    );
  }

  return <IconWell icon={icon} tone={tone} size="md" />;
}

export function MetricChip({
  icon,
  imageUrl,
  tone = "muted",
  label,
  value,
  className,
}: MetricChipProps) {
  return (
    <div
      className={cn(
        "flex max-w-full min-w-0 items-center gap-2 rounded-xl border border-border/50 px-2.5 py-2 shadow-elevation-1 glass-inset",
        className,
      )}
    >
      <MetricChipLeading icon={icon} imageUrl={imageUrl} tone={tone} />
      <div className="grid min-w-0 gap-0.5">
        <span className={typography.caption}>{label}</span>
        <span className={cn("break-words", typography.value)}>{value}</span>
      </div>
    </div>
  );
}
