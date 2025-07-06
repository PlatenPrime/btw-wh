import type { RowDto } from "../../types/dto";

interface ViewProps {
  data: RowDto[];
}

export function View({ data }: ViewProps) {
  return (
    <div>
      Dashboard
      {data?.map((row) => (
        <div key={row._id}>
          <h2>{row.title}</h2>
        </div>
      ))}
    </div>
  );
}
