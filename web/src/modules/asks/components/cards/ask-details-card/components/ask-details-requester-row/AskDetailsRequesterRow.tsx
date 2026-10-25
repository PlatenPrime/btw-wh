import { MetricChip } from "@/components/shared/elements";
import { formatDate } from "@/utils/formatDate";
import { Calendar, User } from "lucide-react";

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
    <div className="grid gap-2 sm:grid-cols-2">
      {hasAuthor ? (
        <MetricChip
          icon={User}
          imageUrl={photo}
          tone="muted"
          label="Автор"
          value={fullname}
          className="w-full"
        />
      ) : null}
      {hasDate ? (
        <MetricChip
          icon={Calendar}
          tone="info"
          label="Створено"
          value={formatDate(createdAt!)}
          className="w-full"
        />
      ) : null}
    </div>
  );
}
