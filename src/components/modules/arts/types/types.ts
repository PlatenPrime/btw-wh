export interface BtradeStock {
  value: number;
  date: string;
  _id: string;
}

export interface Art {
  _id: string;
  artikul: string;
  nameukr: string;
  namerus: string;
  zone: string;
  marker: string;
  __v: number;
  btradeStock: BtradeStock;
}

export interface ArtResponseData {
  data: Art[];
  total: number;
  page: number;
  totalPages: number;
}