import { useState } from "react";
import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { useParams } from "react-router";
import { useSegmentQuery } from "@/modules/blocks/api/hooks/queries/useSegmentQuery";
import { useZonesBySegmentQuery } from "@/modules/blocks/api/hooks/queries/useZonesBySegmentQuery";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddZonesToSegmentDialog } from "@/modules/blocks/components/dialogs/add-zones-to-segment-dialog";
import { RemoveZoneFromSegmentControl } from "@/modules/blocks/components/controls/remove-zone-from-segment-control";

export function SegPage() {
  const { blockId, segId } = useParams<{ blockId: string; segId: string }>();
  const [isAddZonesDialogOpen, setIsAddZonesDialogOpen] = useState(false);

  const {
    data: segmentData,
    isLoading: isSegmentLoading,
    error: segmentError,
  } = useSegmentQuery({
    id: segId ?? "",
    enabled: !!segId,
  });

  const {
    data: zonesData,
    isLoading: isZonesLoading,
    error: zonesError,
  } = useZonesBySegmentQuery({
    segId: segId ?? "",
    enabled: !!segId,
  });

  if (!blockId || !segId) {
    return (
      <SidebarInsetLayout headerText="Сегмент не знайдено">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID блоку або сегмента не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  if (isSegmentLoading) {
    return (
      <SidebarInsetLayout headerText="Завантаження...">
        <main className="p-2">
          <Skeleton className="h-24 w-full" />
        </main>
      </SidebarInsetLayout>
    );
  }

  if (segmentError) {
    return (
      <SidebarInsetLayout headerText="Помилка">
        <main className="p-2">
          <ErrorDisplay
            error={segmentError}
            title="Помилка завантаження сегмента"
            description="Не вдалося завантажити дані сегмента"
          />
        </main>
      </SidebarInsetLayout>
    );
  }

  if (!segmentData || !segmentData.exists || !segmentData.data) {
    return (
      <SidebarInsetLayout headerText="Сегмент не знайдено">
        <main className="p-2">
          <LoadingNoData description="Сегмент не знайдено" />
        </main>
      </SidebarInsetLayout>
    );
  }

  const segment = segmentData.data;
  const zones = zonesData?.exists && zonesData?.data ? zonesData.data : [];

  return (
    <>
      <SidebarInsetLayout
        headerText={`Сегмент #${segment.order} блоку ${segment.blockData.title}`}
      >
        <main className="p-2">
          <div className="flex flex-col gap-2">
            <Wrapper>
              <Card>
                <CardHeader className="grid gap-3 md:flex md:items-center md:justify-between md:gap-4">
                  <CardTitle>Інформація про сегмент</CardTitle>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button onClick={() => setIsAddZonesDialogOpen(true)}>
                      <Plus className="mr-2 size-4" />
                      Додати зони
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="grid gap-1">
                    <span className="text-muted-foreground text-sm">Порядок:</span>
                    <span className="text-sm">{segment.order}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-muted-foreground text-sm">Сектор:</span>
                    <span className="text-sm">{segment.sector}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-muted-foreground text-sm">Блок:</span>
                    <span className="text-sm">{segment.blockData.title}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-muted-foreground text-sm">Кількість зон:</span>
                    <span className="text-sm">{zones.length}</span>
                  </div>
                </CardContent>
              </Card>
            </Wrapper>

            {isZonesLoading ? (
              <Wrapper>
                <Skeleton className="h-24 w-full" />
              </Wrapper>
            ) : zonesError ? (
              <Wrapper>
                <ErrorDisplay
                  error={zonesError}
                  title="Помилка завантаження зон"
                  description="Не вдалося завантажити зони сегмента"
                />
              </Wrapper>
            ) : zones.length === 0 ? (
              <Wrapper>
                <div className="grid gap-4 rounded-lg border border-dashed p-6 text-center">
                  <LoadingNoData description="Цей сегмент не має зон" />
                  <div className="flex justify-center">
                    <Button onClick={() => setIsAddZonesDialogOpen(true)}>
                      <Plus className="mr-2 size-4" />
                      Додати зони
                    </Button>
                  </div>
                </div>
              </Wrapper>
            ) : (
              zones
                .filter((zone) => zone.title)
                .map((zone) => (
                  <Wrapper key={zone._id}>
                    <div className="grid gap-2">
                      <Card>
                        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div className="grid gap-1">
                            <CardTitle>Зона {zone.title}</CardTitle>
                            <span className="text-muted-foreground text-sm">
                              Штрих-код: {zone.bar}
                            </span>
                          </div>
                          <RemoveZoneFromSegmentControl segment={segment} zone={zone} />
                        </CardHeader>
                        <CardContent className="grid gap-2">
                          <div className="grid gap-1">
                            <span className="text-muted-foreground text-sm">Сектор:</span>
                            <span className="text-sm">{zone.sector}</span>
                          </div>
                        </CardContent>
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
                ))
            )}
          </div>
        </main>
      </SidebarInsetLayout>
      <AddZonesToSegmentDialog
        open={isAddZonesDialogOpen}
        onOpenChange={setIsAddZonesDialogOpen}
        segment={segment}
      />
    </>
  );
}

