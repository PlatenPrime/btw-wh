import { SelectLimit } from "@/components/select-limit";
import { Input } from "@/components/ui/input"; // или твой input-компонент
import { useSearchParams } from "react-router";
import { PaginationControls } from "../../pagination-controls";
import { Grid } from "./Grid";
import { useArtsQuery } from "./hooks/useArtsQuery";
import { FileText } from "lucide-react";

const limitOptions = [5, 10, 20, 50, 100];

export function Dashboard() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const search = params.get("search") || "";
  const limit = Number(params.get("limit") || 10);

  const { data, isLoading, isError,  } = useArtsQuery({
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


  

  if (isLoading) return <div>Завантаження...</div>;

  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <main className="max-w-screen grid grid-cols-1 gap-4 p-4 ">

      <section 
        className="flex flex-col md:flex-row justify-center gap-4 items-center justify-between">
      <Input
        placeholder="Пошук артикулів"
        value={search}
        onChange={handleSearchChange}
        className="w-full md:w-1/3"
      />
      <SelectLimit
        limitOptions={limitOptions}
        limit={limit}
        setLimit={setLimit}
      />

        <p className="flex" ><FileText /> {data?.total}</p>

      
      </section>
      
      <PaginationControls
        currentPage={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />

    
   
      <Grid arts={data?.data} />

    </main>
  );
}
