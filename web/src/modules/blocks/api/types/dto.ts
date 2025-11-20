export interface ZoneInBlockDto {
  _id: string;
  title: string;
  bar: number;
  sector: number;
  order?: number;
  block?: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlockDto {
  _id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  zones?: ZoneInBlockDto[];
}

export interface CreateBlockPayload {
  title: string;
}

export interface BlockZoneOrderPayload {
  zoneId: string;
  order: number;
}

export interface UpdateBlockPayload {
  title?: string;
  order?: number;
  zones?: BlockZoneOrderPayload[];
}

export interface ReorderBlocksPayload {
  blocks: Array<{
    blockId: string;
    order: number;
    zones?: BlockZoneOrderPayload[];
  }>;
}

