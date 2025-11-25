import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { useUpdateSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateSegmentMutation";

interface RemoveZoneFromSegmentControlProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
  onRemoved?: () => void;
}

export function RemoveZoneFromSegmentControl({
  segment,
  zone,
  onRemoved,
}: RemoveZoneFromSegmentControlProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateSegmentMutation = useUpdateSegmentMutation();

  const isRemoving = updateSegmentMutation.isPending;
  const isZoneLinked = segment.zones.includes(zone._id);

  const nextZoneIds = useMemo(() => {
    return segment.zones.filter((zoneId) => zoneId !== zone._id);
  }, [segment.zones, zone._id]);

  const handleRemoveZone = async () => {
    if (isRemoving) {
      return;
    }

    try {
      await updateSegmentMutation.mutateAsync({
        id: segment._id,
        data: {
          zones: nextZoneIds,
        },
      });
      onRemoved?.();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Не вдалося відв'язати зону:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={!isZoneLinked}>
          <Trash2 className="mr-2 size-4" />
          Відв'язати
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Видалити зону з сегмента?</DialogTitle>
          <DialogDescription>
            {zone.title ? (
              <>
                Зона <span className="font-semibold">{zone.title}</span> буде відв'язана від сегмента.
              </>
            ) : (
              "Обрана зона буде відв'язана від сегмента."
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 text-sm">
          <div className="grid gap-1">
            <span className="text-muted-foreground">Сегмент:</span>
            <span>#{segment.order} / блок {segment.blockData.title}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">Штрих-код зони:</span>
            <span>{zone.bar}</span>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={isRemoving}
          >
            Скасувати
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemoveZone}
            disabled={isRemoving || !isZoneLinked}
          >
            {isRemoving ? "Видалення..." : "Відв'язати"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


