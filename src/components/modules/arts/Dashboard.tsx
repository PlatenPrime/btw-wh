import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { FileText } from "lucide-react";

import { SelectLimit } from "@/components/select-limit";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "../../pagination-controls";
import { Grid } from "./Grid";
import { useArtsQuery } from "./hooks/useArtsQuery";

const LIMIT_OPTIONS = [5, 10, 20, 50, 100];

function getParam(params: URLSearchParams, key: string, fallback: string = "") {
  return params.get(key) || fallback;
}

function updateSearchParams(
  params: URLSearchParams,
  updates: Record<string, string>,
  setParams: (params: URLSearchParams) => void
) {
  const newParams = new URLSearchParams(params.toString());
  Object.entries(updates).forEach(([key, value]) => {
    newParams.set(key, value);
  });
  setParams(newParams);
}

export function Dashboard() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const search = getParam(params, "search", "");
  const limit = Number(getParam(params, "limit", "10"));

  const { data, isPending, isError,  fetchStatus } = useArtsQuery({ page, limit, search });

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateSearchParams(params, { page: String(newPage) }, setParams);
    },
    [params, setParams]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams(params, {
        search: e.target.value,
        page: "1",
      }, setParams);
    },
    [params, setParams]
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      updateSearchParams(params, {
        limit: String(newLimit),
        page: "1",
      }, setParams);
    },
    [params, setParams]
  );

  const totalItems = useMemo(() => data?.total ?? 0, [data]);

  //  if (status === "pending") {return <p>Pending</p>}


  if (isPending) return <Status message="Завантаження..." />;
  if (isError) return <Status message="Помилка завантаження даних" isError />;
 

  return (
    <main className="max-w-screen grid grid-cols-1 gap-4 p-4">

      {fetchStatus === "fetching" && <p>Fetching</p>}
     
      <Toolbar
        total={totalItems}
        search={search}
        onSearchChange={handleSearchChange}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      <PaginationControls
        currentPage={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />

      <Grid arts={data?.data} />
    </main>
  );
}

function Toolbar({
  total,
  search,
  onSearchChange,
  limit,
  onLimitChange,
}: {
  total: number;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}) {
  return (
    <section className="flex flex-col md:flex-row justify-center gap-4 items-center">
      <p className="flex items-center gap-1 text-muted-foreground">
        <FileText size={18} /> {total}
      </p>
      <Input
        placeholder="Пошук артикулів"
        value={search}
        onChange={onSearchChange}
        className="w-full md:w-1/3"
      />
      <SelectLimit
        limitOptions={LIMIT_OPTIONS}
        limit={limit}
        setLimit={onLimitChange}
      />
    </section>
  );
}

function Status({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <div className={`text-center text-lg ${isError ? "text-red-500" : ""}`}>
      {message}
    </div>
  );
}
