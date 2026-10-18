import { CalendarDate } from "@/components/shared/date/calendar-date/CalendarDate";
import { UserAvatarName } from "@/components/shared/entities/user/UserAvatarName";

interface AskDetailsRequesterRowProps {
  fullname?: string | null;
  photo?: string | null;
  createdAt?: string | null;
}

export function AskDetailsRequesterRow({
  fullname,
  photo,
  createdAt,
}: AskDetailsRequesterRowProps) {
  const hasAuthor = Boolean(fullname);
  const hasDate = Boolean(createdAt);

  if (!hasAuthor && !hasDate) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      {hasAuthor ? (
        <UserAvatarName
          photoUrl={photo ?? undefined}
          fullname={fullname!}
          size="xs"
        />
      ) : null}
      {hasDate ? <CalendarDate date={createdAt!} /> : null}
    </div>
  );
}
