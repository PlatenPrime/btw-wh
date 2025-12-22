import type {
  GetPosesByArtikulResponse,
  PosResponse,
} from "@/modules/poses/api/types";
import type { ReactNode } from "react";

export interface PosesByArtikulContainerProps {
  artikul: string;
  renderPos: (
    pos: PosResponse,
    additionalProps?: Record<string, unknown>,
  ) => ReactNode;
  additionalProps?: Record<string, unknown>;
}

export interface PosesByArtikulContainerViewProps {
  data: GetPosesByArtikulResponse;
  renderPos: (
    pos: PosResponse,
    additionalProps?: Record<string, unknown>,
  ) => ReactNode;
  additionalProps?: Record<string, unknown>;
}

