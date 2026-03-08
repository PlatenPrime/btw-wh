export interface IAnalogSliceDataItem {
  stock: number;
  price: number;
  artikul?: string;
}

export interface AnalogSlicePayload {
  konkName: string;
  date: string;
  data: Record<string, IAnalogSliceDataItem>;
}

export interface AnalogSliceResponseDto {
  message: string;
  data: AnalogSlicePayload;
}
