import { IArt } from "@/modules/arts/types/IArt";
import { Link } from "react-router";

interface ArtsListProps {
  data: IArt[] | undefined;
}

export function ArtsList({ data }: ArtsListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {data?.map((art) => (
          <Link to={`/arts/${art._id}`} key={art._id}>{art?.nameukr}</Link>
        ))}
      </div>
    </div>
  );
}
