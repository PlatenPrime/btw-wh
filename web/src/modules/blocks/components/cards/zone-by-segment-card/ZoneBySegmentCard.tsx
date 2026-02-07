import { useState } from "react";
import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Dialog } from "@/components/ui/dialog";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Card,
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
    <Wrapper>
      <div className="grid gap-2">
        <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
          <CardHeader className="p-0">
            <CardTitle>Зона {zone.title}</CardTitle>
            <CardDescription>
              <span className="text-muted-foreground flex items-center gap-2 text-xs">
                <ScanBarcode className="size-4 shrink-0" aria-hidden />
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
        </Card>
        {zone.title && (
          <ArtsByZoneFetcher
            zone={zone.title.trim()}
            ContainerComponent={ArtsByZoneContainer}
            SkeletonComponent={ArtsByZoneContainerSkeleton}
          />
        )}
      </div>
    </Wrapper>
  );
}
