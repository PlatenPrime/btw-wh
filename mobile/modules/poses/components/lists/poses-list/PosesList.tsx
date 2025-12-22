import type { IPos } from "@/modules/poses/api/types";
import { PosesListView } from "./PosesListView";

interface PosesListProps {
  poses: IPos[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PosesList({
  poses,
  refreshing,
  onRefresh,
}: PosesListProps) {
  return (
    <PosesListView poses={poses} refreshing={refreshing} onRefresh={onRefresh} />
  );
}

