import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { RowDto } from "./dto";

export type RowsRefetch = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<RowDto[], Error>>;
export type RowRefetch = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<RowDto, Error>>;
