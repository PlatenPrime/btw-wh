import { CardActionsMenu } from "@/components/shared/card-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { DeleteDelDialog } from "@/modules/dels/components/dialogs/delete-del-dialog/DeleteDelDialog";
import { Link } from "react-router";
import { Package, Trash } from "lucide-react";
import { useState } from "react";

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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
  };

  const actions = [
    {
      id: "delete",
      label: "Видалити поставку",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => setIsDeleteOpen(true),
    },
  ];

  return (
    <>
      <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <CardTitle>
              <Link
                to={`/wh/dels/${del._id}`}
                className="hover:underline"
              >
                {del.title}
              </Link>
            </CardTitle>
            <CardActionsMenu
              actions={actions}
              orientation="vertical"
              size="sm"
              align="end"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 p-0">
          <div className="flex items-center gap-2">
            <Package className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
            <span className="text-muted-foreground text-xs">
              {formatDate(del.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
      <DeleteDelDialog
        del={del}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
