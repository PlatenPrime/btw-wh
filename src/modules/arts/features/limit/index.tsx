import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface ArtsLimitProps {
  limit: number;
  setLimit: (limit: number) => void;
}

export  function ArtsLimit({
    limit,
    setLimit
}: ArtsLimitProps) {
  return (
    <div className="w-40" >
    <Select 
    onValueChange={(value) => setLimit(+value)}
    >
      <SelectTrigger >
        <SelectValue placeholder={"На сторінці: " + limit} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
    </div>
  );
}
