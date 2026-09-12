import type { ReactNode } from "react";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { typography } from "@/lib/typography";

export interface KonkBannerProps {
  konkName: string;
  imageUrl?: string | null;
  title?: string | null;
  actionSlot?: ReactNode;
}

export function KonkBanner({
  konkName,
  imageUrl,
  title,
  actionSlot,
}: KonkBannerProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 bg-muted/60 p-1 text-foreground first:rounded-t-xl">
      <div className="flex min-w-0 flex-1 justify-center">
        <EntityLabel
          imageUrl={imageUrl}
          title={title}
          fallbackLabel={konkName}
          imageSize="xs"
          className={typography.caption}
        />
      </div>
      {actionSlot ? (
        <div className="flex shrink-0 items-center">{actionSlot}</div>
      ) : null}
    </div>
  );
}
