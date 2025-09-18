import type {
  GetPosesByArtikulResponse,
  PosResponse,
} from "@/modules/poses/api/types";
import type { ReactNode } from "react";

export interface PosesByArtikulContainerProps {
  artikul: string;
  renderPos: (pos: PosResponse, additionalProps?: unknown) => ReactNode;
  additionalProps?: unknown;
}

export interface PosesByArtikulContainerViewProps {
  data: GetPosesByArtikulResponse;
  renderPos: (pos: PosResponse, additionalProps?: unknown) => ReactNode;
  additionalProps?: unknown;
}
