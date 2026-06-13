import { useCallback } from "react";
import { toast } from "sonner";
import { AppVersionWatcher } from "@/components/shared/app-version/AppVersionWatcher";
import { useAppVersionCheck } from "@/components/shared/app-version/use-app-version-check";

export function AppVersionWatcherContainer() {
  const handleVersionChange = useCallback(() => {
    toast.info("Доступна нова версія", {
      description: "Оновіть сторінку, щоб отримати останні зміни",
      duration: Infinity,
      action: {
        label: "Оновити",
        onClick: () => {
          window.location.reload();
        },
      },
    });
  }, []);

  useAppVersionCheck({ onVersionChange: handleVersionChange });

  return <AppVersionWatcher />;
}
