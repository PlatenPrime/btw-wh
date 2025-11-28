import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { RemoveZoneFromSegmentControl } from "@/modules/blocks/components/controls/remove-zone-from-segment-control";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";
import { ScanBarcode } from "lucide-react";

interface ZoneBySegmentCardProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
}

export function ZoneBySegmentCard({ segment, zone }: ZoneBySegmentCardProps) {
  return (
    <Wrapper>
      <div className="grid gap-2">
        <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle>Зона {zone.title} </CardTitle>
            <CardDescription>
              <span className="text-muted-foreground flex items-center gap-2 text-xs">
                <ScanBarcode className="size-4" /> {zone.bar}
              </span>
            </CardDescription>

            <RemoveZoneFromSegmentControl segment={segment} zone={zone} />
          </CardHeader>
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
