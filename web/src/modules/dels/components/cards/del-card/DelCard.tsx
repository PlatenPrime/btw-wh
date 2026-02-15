import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { Link } from "react-router";
import { Package } from "lucide-react";

interface DelCardProps {
  del: DelListItemDto;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function DelCard({ del }: DelCardProps) {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <CardTitle>
          <Link
            to={`/wh/dels/${del._id}`}
            className="hover:underline"
          >
            {del.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center gap-2">
          <Package className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
          <span className="text-muted-foreground text-xs">
            Створено: {formatDate(del.createdAt)}
          </span>
        </div>
        <div className="text-muted-foreground text-xs">
          Оновлено: {formatDate(del.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}
