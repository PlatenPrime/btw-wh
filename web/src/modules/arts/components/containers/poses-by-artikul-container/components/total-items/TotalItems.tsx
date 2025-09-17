import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { Circle, NotepadText, Package } from "lucide-react";
import { TotalItem } from "@/modules/arts/components/containers/poses-by-artikul-container/components/total-items/TotalItem.tsx";
import { Container } from '@/components/shared/container';

interface TotalItemsProps {
  data: GetPosesByArtikulResponse;
}

export function TotalItems({ data }: TotalItemsProps) {
  return (
    <Container className="flex gap-4">
      <TotalItem
        quant={data.total}
        icon={<NotepadText className="text-muted-foreground m-0 size-[1cap]" />}
      />
      <TotalItem
        quant={data.totalBoxes}
        icon={<Package className="text-muted-foreground size-[1cap]" />}
      />
      <TotalItem
        quant={data.totalQuant}
        icon={<Circle className="text-muted-foreground size-[1cap]" />}
      />
    </Container>
  );
}
