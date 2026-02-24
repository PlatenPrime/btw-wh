import type { ListResponse, MutationResponse } from "@/types/api";

export interface ConstantDto {
  _id: string;
  name: string;
  title: string;
  data: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConstantDto {
  name: string;
  title: string;
  data?: Record<string, string>;
}

export interface UpdateConstantDto {
  name?: string;
  title?: string;
  data?: Record<string, string>;
}

export interface DeleteConstantResponse {
  message: string;
}

export type ConstantsListResponse = ListResponse<ConstantDto>;
export type ConstantResponse = MutationResponse<ConstantDto>;
