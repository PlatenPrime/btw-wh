import { SERVER_URL } from "@/constants/server";

export function buildExcelJobFileUrl(jobId: string, token: string): string {
  const base = SERVER_URL.endsWith("/") ? SERVER_URL : `${SERVER_URL}/`;
  return `${base}excel-jobs/${encodeURIComponent(jobId)}/file?token=${encodeURIComponent(token)}`;
}

export function startExcelJobFileDownload(jobId: string, token: string): void {
  window.location.assign(buildExcelJobFileUrl(jobId, token));
}
