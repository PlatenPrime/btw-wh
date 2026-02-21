import type { ListResponse, MutationResponse } from "@/types/api";

export interface ProdDto {
  _id: string;
  name: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProdDto {
  name: string;
  title: string;
  imageUrl: string;
}

export interface UpdateProdDto {
  name?: string;
  title?: string;
  imageUrl?: string;
}

export interface DeleteProdResponse {
  message: string;
}

export type ProdsListResponse = ListResponse<ProdDto>;
export type ProdResponse = MutationResponse<ProdDto>;
