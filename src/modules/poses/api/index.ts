import { apiClient } from "@/lib/apiClient";
import type {
  BulkCreatePosDto,
  CreatePosDto,
  IPos,
  PosListResponse,
  PosResponse,
  UpdatePosDto,
} from "../types";

export const getAllPoses = async (
  params: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>,
  signal?: AbortSignal,
): Promise<PosListResponse> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) query.append(k, String(v));
  });
  const res = await apiClient.get<PosListResponse>(
    `/poses?${query.toString()}`,
    { signal },
  );
  return res.data;
};

export const getPosById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.get<PosResponse>(`/poses/${id}`, { signal });
  return res.data;
};

export const getPosesByPalletId = async (
  palletId: string,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const res = await apiClient.get<IPos[]>(`/poses/by-pallet/${palletId}`, {
    signal,
  });
  return res.data;
};

export const getPosesByRowId = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const res = await apiClient.get<IPos[]>(`/poses/by-row/${rowId}`, { signal });
  return res.data;
};

export const createPos = async (
  data: CreatePosDto,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.post<PosResponse>("/poses", data, { signal });
  return res.data;
};

export const bulkCreatePoses = async (
  data: BulkCreatePosDto,
  signal?: AbortSignal,
): Promise<{ message: string; data: IPos[] }> => {
  const res = await apiClient.post<{ message: string; data: IPos[] }>(
    "/poses/bulk",
    data,
    { signal },
  );
  return res.data;
};

export const updatePos = async (
  id: string,
  data: UpdatePosDto,
  signal?: AbortSignal,
): Promise<PosResponse> => {
  const res = await apiClient.put<PosResponse>(`/poses/${id}`, data, {
    signal,
  });
  return res.data;
};

export const deletePos = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/poses/${id}`, {
    signal,
  });
  return res.data;
};
