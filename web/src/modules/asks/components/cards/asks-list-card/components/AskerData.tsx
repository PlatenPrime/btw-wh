import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AskUserData } from "@/modules/asks/api/types/dto";
import { formatDate } from "@/utils/formatDate";
import { CalendarIcon } from "lucide-react";

interface AskerDataProps {
  date: string;
  askerData: AskUserData;
}

export function AskerData({ date, askerData }: AskerDataProps) {
  return (
    <div className="grid gap-2">
      
      <div className="flex items-center gap-2">
        <Avatar className="size-4" >
          <AvatarImage src={askerData?.photo} alt={askerData?.fullname}  />
          <AvatarFallback>{askerData?.fullname.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-foreground text-sm ">{askerData?.fullname}</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4" />
        <span className="text-muted-foreground text-xs ">
          {" "}
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
}
