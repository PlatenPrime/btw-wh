import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PaginationControls } from "./PaginationControls";

interface BtradeStock {
  value: number;
  date: string;
  _id: string;
}

interface Art {
  _id: string;
  artikul: string;
  nameukr: string;
  nameRus: string;
  zone: string;
  marker: string;
  __v: number;
  btradeStock: BtradeStock;
}


interface ResponseData {
  data: Art[];
  total: number;
  page: number;
  totalPages: number;
}

export function ArtsList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  // Хэндлер поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // сброс на первую страницу при новом поиске
  };

  // debounce вручную (можно заменить на lodash.debounce, но делаем нативно)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // задержка 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const fetchProducts = async (): Promise<ResponseData> => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (debouncedSearch) {
      params.append("search", debouncedSearch);
    }

    const response = await fetch(
      `https://btw-wh.up.railway.app/api/arts?${params.toString()}`
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  };

  const { data, isLoading, isError, isPending } = useQuery<ResponseData>({
    queryKey: ["arts", page, debouncedSearch],
    queryFn: fetchProducts,
    placeholderData: (prev) => prev,
    staleTime: 60 * 1000,
  });


  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid gap-2">
        {data?.data.length ? (
          data.data.map((art) => <div key={art._id}>{art.nameukr}</div>)
        ) : (
          <div>No results found</div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
      <span>
  Page {data?.page ?? "-"} of {data?.totalPages ?? "-"}
</span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < (data?.totalPages || 1) ? prev + 1 : prev
            )
          }
          disabled={page >= (data?.totalPages || 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isPending && <div className="text-sm text-gray-400">Updating...</div>}
      <PaginationControls page={data?.page ?? 1} totalPages={data?.totalPages ?? 1} />
    </div>
  );
}
