import type { ListResponse, MutationResponse } from "@/types/api";

export interface DelArtikulItem {
  quantity: number;
  nameukr?: string;
}

export interface DelDto {
  _id: string;
  title: string;
  artikuls: Record<string, DelArtikulItem>;
  createdAt: string;
  updatedAt: string;
}

export interface DelListItemDto {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDelDto {
  title: string;
  prodName: string;
  artikuls?: Record<string, number>;
}

export interface DeleteDelResponse {
  message: string;
}

export type DelsListResponse = ListResponse<DelListItemDto>;
export type DelResponse = MutationResponse<DelDto>;
