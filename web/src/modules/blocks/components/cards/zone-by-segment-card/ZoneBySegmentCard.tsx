import { useState } from "react";
import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import { Dialog } from "@/components/ui/dialog";
import { SurfaceSection } from "@/components/shared/layout";
import { ListRowCard } from "@/components/shared/cards";
import { IconWell } from "@/components/shared/elements";
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import {
  RemoveZoneFromSegmentDialog,
} from "@/modules/blocks/components/dialogs/remove-zone-from-segment-dialog";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";
import { ScanBarcode, Trash2 } from "lucide-react";

interface ZoneBySegmentCardProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
}

export function ZoneBySegmentCard({ segment, zone }: ZoneBySegmentCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isZoneLinked = segment.zones.some((z) => z._id === zone._id);
  const actions = isZoneLinked
    ? [
        {
          id: "unlink",
          label: "Відв'язати",
          icon: Trash2,
          variant: "destructive" as const,
          onClick: () => setIsDialogOpen(true),
        },
      ]
    : [];

  return (
    <SurfaceSection>
      <div className="grid gap-2">
        <ListRowCard>
          <CardHeader className="p-0">
            <CardTitle>Зона {zone.title}</CardTitle>
            <CardDescription>
              <span className="text-muted-foreground flex items-center gap-2 text-xs">
                <IconWell icon={ScanBarcode} tone="warning" size="sm" />
                {zone.bar}
              </span>
            </CardDescription>
            {actions.length > 0 && (
              <CardAction>
                <CardActionsMenu
                  actions={actions}
                  orientation="horizontal"
                  size="sm"
                  align="end"
                />
              </CardAction>
            )}
          </CardHeader>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <RemoveZoneFromSegmentDialog
              segment={segment}
              zone={zone}
              onClose={() => setIsDialogOpen(false)}
            />
          </Dialog>
        </ListRowCard>
        {zone.title && (
          <ArtsByZoneFetcher
            zone={zone.title.trim()}
            ContainerComponent={ArtsByZoneContainer}
            SkeletonComponent={ArtsByZoneContainerSkeleton}
          />
        )}
      </div>
    </SurfaceSection>
  );
}
