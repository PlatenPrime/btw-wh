import { useQuery } from "@tanstack/react-query";

interface BtradeStock {
  value: number;
  date: string; // ISO 8601 date string
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

interface Pagination {
  total: number;
  page: number;
  totalPages: number;
}

interface ResponseData {
  data: Art[];
  pagination: Pagination;
}

export function ArtsList() {
  const fetchProducts = async () => {
    const response = await fetch("https://btw-wh.up.railway.app/api/arts");
    return response.json();
  };

  const useArts = () => {
    return useQuery<ResponseData>({
      queryKey: ["arts"], // Change this line
      queryFn: fetchProducts,
    });
  };

  console.log(useArts());

  const { data, isLoading, isError } = useArts();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {


    
    return <div>Error loading data</div>;
  }



  return <div>
    {data?.data.map((art) => art.nameukr)}
    </div>;
}
