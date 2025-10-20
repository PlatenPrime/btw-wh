import { apiClient } from '../../../../lib/apiClient';

export const deletePos = async (id: string, signal?: AbortSignal): Promise<void> => {
  await apiClient.delete(`/poses/${id}`, { signal });
};
