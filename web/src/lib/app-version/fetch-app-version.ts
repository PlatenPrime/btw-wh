export interface AppVersionInfo {
  version: string;
  builtAt: string;
}

export async function fetchAppVersion(): Promise<AppVersionInfo | null> {
  try {
    const response = await fetch("./version.json", { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AppVersionInfo;
  } catch {
    return null;
  }
}
