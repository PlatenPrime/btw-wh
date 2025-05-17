import { Input } from "@/components/ui/input"; // или твой input-компонент
import { useDebounce } from "@/hooks/useDebounce"; // не забудь debounce
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PaginationControls } from "./PaginationControls";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BtradeStock {
  value: number;
  date: string;
  _id: string;
}

interface Art {
  _id: string;
  artikul: string;
  nameukr: string;
  namerus: string;
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

const limitOptions = [5, 10, 20, 50];

export function ArtsList() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const search = params.get("search") || "";
  const limit = Number(params.get("limit") || 10);

  const debouncedSearch = useDebounce(search, 400);

const fetchArts = async (): Promise<ResponseData> => {
  const res = await fetch(
    `https://btw-wh.up.railway.app/api/arts?page=${page}&limit=${limit}&search=${debouncedSearch}`
  );
  return res.json();
};

  const { data, isLoading, isError } = useQuery({
    queryKey: ["arts", { page, limit, search: debouncedSearch }],
    queryFn: fetchArts,
    placeholderData: (prev) => prev,
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

      <Select value={String(limit)} onValueChange={(val) => setLimit(Number(val))}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Показать" />
        </SelectTrigger>
        <SelectContent>
          {limitOptions.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt} 
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
