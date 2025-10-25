export interface UploadingZone {
  title: string;
  bar: number;
  sector?: number;
}

export interface UpsertZonesResult {
  message: string;
  result: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedCount: number;
    upsertedIds: Record<string, string>;
  };
}

