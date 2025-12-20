import type { IPos } from "@/modules/poses/api/types";
import { PosesListView } from "./PosesListView";

interface PosesListProps {
  poses: IPos[] | undefined;
}

export function PosesList({ poses }: PosesListProps) {
  return <PosesListView poses={poses} />;
}

