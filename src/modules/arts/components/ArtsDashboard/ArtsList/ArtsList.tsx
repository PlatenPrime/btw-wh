import { Button } from "@/components/ui/button";
import { IArt } from "@/modules/arts/types/IArt";
import { useState } from "react";

interface ArtsListProps {
  data: IArt[] | undefined;
}

type ArtsListView = "list" | "grid";

export function ArtsList({ data }: ArtsListProps) {
  const [view, setView] = useState<ArtsListView>("list");

  const viewStyles = {
    list: "grid grid-cols-1 gap-4",
    grid: "grid grid-cols-3 gap-4",
  };

  const toggleView = () => {
    setView(view === "list" ? "grid" : "list");
  };

  return (
    <div>
      <h2>
        <Button onClick={toggleView}>
          {view === "list" ? "Список" : "Сітка"}
        </Button>
      </h2>
      <div className={viewStyles[view]}>
        {data?.map((art) => (
          <p>{art?.artikul}</p>
        ))}
      </div>
    </div>
  );
}
