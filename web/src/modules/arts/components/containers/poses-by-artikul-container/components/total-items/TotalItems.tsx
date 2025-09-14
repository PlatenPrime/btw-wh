import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { Circle, NotepadText, Package } from "lucide-react";
import { TotalItem } from "./TotalItem";
import { Container } from "@/components/container";

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
