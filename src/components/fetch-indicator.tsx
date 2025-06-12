import { LoaderPinwheel } from "lucide-react";

interface FetchIndicatorProps {
  total: number;
  fetchStatus: string;
  icon: React.ReactNode;
}

export function FetchIndicator({
  total,
  fetchStatus,
  icon,
}: FetchIndicatorProps) {
  return (
    <div className="flex justify-between items-center gap-4 w-full md:w-auto">
      <p className="flex items-center gap-1 text-muted-foreground">
        {fetchStatus === "fetching" ? (
          <LoaderPinwheel className="animate-spin" />
        ) : (
          icon
        )}
        {total}
      </p>
    </div>
  );
}
