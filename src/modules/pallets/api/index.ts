import { apiClient } from "@/lib/apiClient";
import type {
  CreatePalletDto,
  PalletListResponse,
  PalletResponse,
  UpdatePalletDto,
} from "../types";

export const getAllPallets = async (
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const res = await apiClient.get<PalletListResponse>("/pallets", { signal });
  return res.data;
};

export const getPalletById = async (
  id: string,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.get<PalletResponse>(`/pallets/${id}`, { signal });
  return res.data;
};

export const getPalletsByRowId = async (
  rowId: string,
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const res = await apiClient.get<PalletListResponse>(
    `/pallets/by-row/${rowId}`,
    { signal },
  );
  return res.data;
};

export const createPallet = async (
  data: CreatePalletDto,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.post<PalletResponse>("/pallets", data, {
    signal,
  });
  return res.data;
};

export const updatePallet = async (
  id: string,
  data: UpdatePalletDto,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const res = await apiClient.put<PalletResponse>(`/pallets/${id}`, data, {
    signal,
  });
  return res.data;
};

export const deletePallet = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(`/pallets/${id}`, {
    signal,
  });
  return res.data;
};

export const deletePalletPoses = async (
  id: string,
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.delete<{ message: string }>(
    `/pallets/${id}/poses`,
    { signal },
  );
  return res.data;
};

export const movePalletPoses = async (
  fromPalletId: string,
  toPalletId: string,
  positionIds: string[],
  signal?: AbortSignal,
): Promise<{ message: string }> => {
  const res = await apiClient.post<{ message: string }>(
    "/pallets/move-poses",
    { fromPalletId, toPalletId, positionIds },
    { signal },
  );
  return res.data;
};
