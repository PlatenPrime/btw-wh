import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { Trash2 } from "lucide-react";

interface RemoveZoneFromSegmentDialogTriggerProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
}

export function RemoveZoneFromSegmentDialogTrigger({
  segment,
  zone,
}: RemoveZoneFromSegmentDialogTriggerProps) {
  const isZoneLinked = segment.zones.some((z) => z._id === zone._id);

  return (
    <DialogTrigger asChild>
      <Button variant="destructive" size="sm" disabled={!isZoneLinked}>
        <Trash2 className="size-4" />
        Відв'язати
      </Button>
    </DialogTrigger>
  );
}
