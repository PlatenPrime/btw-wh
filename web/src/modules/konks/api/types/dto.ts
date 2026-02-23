import type { ListResponse, MutationResponse } from "@/types/api";

export interface KonkDto {
  _id: string;
  name: string;
  title: string;
  url: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKonkDto {
  name: string;
  title: string;
  url: string;
  imageUrl: string;
}

export interface UpdateKonkDto {
  name?: string;
  title?: string;
  url?: string;
  imageUrl?: string;
}

export interface DeleteKonkResponse {
  message: string;
}

export type KonksListResponse = ListResponse<KonkDto>;
export type KonkResponse = MutationResponse<KonkDto>;
