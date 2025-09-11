import { CalendarDate } from "@/components/date/CalendarDate";
import { UserAvatarName } from "@/components/user/UserAvatarName";
import type { AskUserData } from "@/modules/asks/api/types/dto";

interface AskerDataProps {
  date: string;
  askerData: AskUserData;
}

export function AskerData({ date, askerData }: AskerDataProps) {
  return (
    <div className="grid gap-2">
      <UserAvatarName
        photoUrl={askerData?.photo}
        fullname={askerData?.fullname}
        className="text-sm"
        size="xs"
      />
      <CalendarDate date={date} />
    </div>
  );
}
