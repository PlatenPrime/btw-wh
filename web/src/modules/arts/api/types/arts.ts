export interface UploadingArt {
  artikul: string;
  prodName?: string;
  zone: string;
  namerus: string;
  nameukr: string;
  limit?: number;
  marker?: string;
  abc?: string;
  /** Штрихкод артикула */
  bar?: string;
  /** Штрихкод коробки */
  boxbar?: string;
}
