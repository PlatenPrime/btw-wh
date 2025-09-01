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
        <CalendarIcon className="h-4 w-4" />
        <span className="text-foreground font-mono text-xs">
          {" "}
          {formatDate(date)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={askerData?.photo} />
          <AvatarFallback>{askerData?.fullname.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-foreground font-mono">{askerData?.fullname}</span>
      </div>
    </div>
  );
}
