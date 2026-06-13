import { useCallback, useEffect, useRef } from "react";
import { fetchAppVersion } from "@/lib/app-version/fetch-app-version";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

interface UseAppVersionCheckOptions {
  onVersionChange: () => void;
}

export function useAppVersionCheck({
  onVersionChange,
}: UseAppVersionCheckOptions) {
  const currentVersionRef = useRef<string | null>(null);
  const hasNotifiedRef = useRef(false);

  const checkVersion = useCallback(async () => {
    const versionInfo = await fetchAppVersion();

    if (!versionInfo?.version) {
      return;
    }

    if (currentVersionRef.current === null) {
      currentVersionRef.current = versionInfo.version;
      return;
    }

    if (
      currentVersionRef.current !== versionInfo.version &&
      !hasNotifiedRef.current
    ) {
      hasNotifiedRef.current = true;
      onVersionChange();
    }
  }, [onVersionChange]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      return;
    }

    void checkVersion();

    const intervalId = window.setInterval(() => {
      void checkVersion();
    }, POLL_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void checkVersion();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkVersion]);
}
