import type { BlockDto, ZoneInBlockDto } from "@/modules/blocks/api/types";

export type DraftBlock = BlockDto & {
  zones: ZoneInBlockDto[];
};

