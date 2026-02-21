import { CardActionsMenu } from "@/components/shared/card-actions";
import { Image } from "@/components/shared/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { DelListItemDto } from "@/modules/dels/api/types";
import { DeleteDelDialog } from "@/modules/dels/components/dialogs/delete-del-dialog/DeleteDelDialog";
import { Link } from "react-router";
import { Package, Trash } from "lucide-react";
import { useState } from "react";

const FALLBACK_IMAGE = "https://placehold.co/80x80?text=Лого&font=roboto";

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
        <CardContent className="flex items-center gap-2 p-0">
          <div className="size-12 shrink-0 overflow-hidden rounded border bg-muted">
            <Image
              src={del.prod?.imageUrl ?? FALLBACK_IMAGE}
              alt={del.prod?.title ?? "Логотип"}
              className="size-full object-contain"
              fallbackSrc={FALLBACK_IMAGE}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <CardTitle className="p-0">
              <Link
                to={`/wh/dels/${del._id}`}
                className="block truncate hover:underline"
              >
                {del.title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Package className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
              <span className="text-muted-foreground truncate text-xs">
                {formatDate(del.createdAt)}
              </span>
            </div>
          </div>
          <CardActionsMenu
            actions={actions}
            orientation="vertical"
            size="sm"
            align="end"
          />
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
