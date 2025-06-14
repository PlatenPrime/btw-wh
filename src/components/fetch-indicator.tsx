import { LoaderPinwheel } from "lucide-react";

interface FetchIndicatorProps {
  total: number;
  isFetching: boolean;
  icon: React.ReactNode;
}

export function FetchIndicator({
  total,
  isFetching,
  icon,
}: FetchIndicatorProps) {
  return (
    <div className="flex justify-between items-center gap-4 w-full md:w-auto">
      <p className="flex items-center gap-1 text-muted-foreground">
        {isFetching ? (
          <LoaderPinwheel className="animate-spin" />
        ) : (
          icon
        )}
        {total}
      </p>
    </div>
  );
}
