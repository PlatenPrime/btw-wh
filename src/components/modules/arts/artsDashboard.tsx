import { SelectLimit } from "@/components/select-limit";
import { Input } from "@/components/ui/input"; // или твой input-компонент
import { useSearchParams } from "react-router";
import { PaginationControls } from "../../pagination-controls";
import { useArtsQuery } from "./hooks/useArtsQuery";

const limitOptions = [5, 10, 20, 50];

export function ArtsList() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const search = params.get("search") || "";
  const limit = Number(params.get("limit") || 10);

  const { data, isLoading, isError } = useArtsQuery({
    page,
    limit,
    search,
  });

  const handlePageChange = (newPage: number) => {
    params.set("page", String(newPage));
    setParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    params.set("search", e.target.value);
    params.set("page", "1");
    setParams(params);
  };

  const setLimit = (newLimit: number) => {
    params.set("limit", String(newLimit));
    params.set("page", "1"); // сбрасываем страницу при изменении лимита
    setParams(params);
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={handleSearchChange}
      />

      <SelectLimit
        limitOptions={limitOptions}
        limit={limit}
        setLimit={setLimit}
      />

      <ul>
        {data?.data.map((art) => (
          <li key={art._id}>
            <strong>{art.artikul}</strong> – {art.nameukr}
          </li>
        ))}
      </ul>

      <PaginationControls
        currentPage={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
