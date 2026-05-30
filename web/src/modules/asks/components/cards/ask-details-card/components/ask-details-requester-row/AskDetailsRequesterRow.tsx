import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";

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
    <div className="border-border/40 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-4 py-2.5 text-sm">
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
