import { LoaderPinwheel, NotepadText } from "lucide-react";

interface ArtsFetchIndicatorProps {
  total: number;
  fetchStatus: string;
}


export  function ArtsFetchIndicator({total, fetchStatus}: ArtsFetchIndicatorProps) {
  return  <div className="flex justify-between items-center gap-4 w-full md:w-auto">
        <p className="flex items-center gap-1 text-muted-foreground">
          {fetchStatus === "fetching" ? (
            <LoaderPinwheel className="animate-spin" />
          ) : (
            <NotepadText />
          )}
          {total}
        </p>

   
      </div>;
}
