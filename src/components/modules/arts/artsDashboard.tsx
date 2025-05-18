import { SelectLimit } from "@/components/select-limit";
import { Input } from "@/components/ui/input"; // или твой input-компонент
import { useSearchParams } from "react-router";
import { PaginationControls } from "../../pagination-controls";
import { ArtsList } from "./artList";
import { useArtsQuery } from "./hooks/useArtsQuery";

const limitOptions = [5, 10, 20, 50, 100];

export function ArtsDashboard() {
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
    <main className="grid grid-cols-1 gap-4 p-4">
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
      
      <PaginationControls
        currentPage={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />

      <p>Всього: {data?.total}</p>

      <ArtsList arts={data?.data} />

    </main>
  );
}
