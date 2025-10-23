export interface UploadingZone {
  title: string;
  bar: number;
  sector?: number;
}

export interface ExcelUploadResult {
  message: string;
  results: {
    created: number;
    skipped: number;
    errors: Array<{
      index: number;
      error: string;
      data: {
        title: string;
        bar: number;
      };
    }>;
  };
}

