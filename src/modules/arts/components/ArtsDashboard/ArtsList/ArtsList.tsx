import { ScrollArea } from "@/components/ui/scroll-area";
import { IArt } from "@/modules/arts/types/IArt";
import { Link } from "react-router";
import ArtImage from "../../ArtWidget/ArtCard/ArtImage/ArtImage";

interface ArtsListProps {
  data: IArt[] | undefined;
}

export function ArtsList({ data }: ArtsListProps) {
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-1 gap-2">
        {data?.map((art) => (
          <Link
            className="h-12 border flex gap-2 hover:bg-sidebar-accent  transition-all duration-300 ease-in-out"
            to={`/arts/${art._id}`}
            key={art._id}
          >
            <div className="w-10">
              <ArtImage artikul={art.artikul} />{" "}
            </div>
            <span> {art?.nameukr}</span>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
