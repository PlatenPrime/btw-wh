import { Container } from '@/components/shared/container';
import type { WarehouseData } from "@/modules/poses/api/types";
import { Circle, Package } from "lucide-react";
import { AskPosLink } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/components/ask-pos-link/AskPosLink";

interface AskSkladPosesListProps {
  skladData: WarehouseData;
  title: string;
  askId: string;
}

export function AskSkladPosesList({
  skladData,
  title,
  askId,
}: AskSkladPosesListProps) {

  if (!skladData.poses?.length) return null;


  return (
    <Container className="grid gap-2">
      <div className="grid grid-cols-3">
        <h3 className="pl-4 font-semibold">{title}</h3>
        <div className="flex items-center justify-center gap-1 font-semibold">
          <Package className="h-3 w-3" />
          <span>{skladData.boxes}</span>
        </div>
        <div className="flex items-center justify-end gap-1 font-semibold pr-2">
          <Circle className="h-3 w-3" />
          <span>{skladData.quant}</span>
        </div>
      </div>

      {skladData.poses?.length > 0 && (
        <div className="grid gap-2">
          {skladData.poses?.map((pos) => (
            <AskPosLink key={pos._id} pos={pos} askId={askId} />
          ))}
        </div>
      )}
    </Container>
  );
}
