import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KaskDto } from "@/modules/kasks/api/types/dto";
import { useDeleteKaskMutation } from "@/modules/kasks/api/hooks/mutations/useDeleteKaskMutation";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

interface KasksListProps {
  kasks: KaskDto[];
}

export function KasksList({ kasks }: KasksListProps) {
  const deleteMutation = useDeleteKaskMutation();

  if (kasks.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        Немає записів за обрану дату.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Час</TableHead>
          <TableHead>Артикул</TableHead>
          <TableHead>Назва</TableHead>
          <TableHead className="w-[80px]">К-ть</TableHead>
          <TableHead>Зона</TableHead>
          <TableHead>Коментар</TableHead>
          <TableHead className="w-[60px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {kasks.map((k) => (
          <TableRow key={k._id}>
            <TableCell className="text-muted-foreground text-xs">
              {format(new Date(k.createdAt), "HH:mm")}
            </TableCell>
            <TableCell className="font-mono text-sm">{k.artikul}</TableCell>
            <TableCell className="max-w-[200px] truncate text-sm">
              {k.nameukr}
            </TableCell>
            <TableCell>
              {k.quant != null ? k.quant : "—"}
            </TableCell>
            <TableCell>{k.zone}</TableCell>
            <TableCell className="max-w-[240px] truncate text-sm">
              {k.com?.trim() ? k.com : "—"}
            </TableCell>
            <TableCell>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(k._id)}
                aria-label="Видалити"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
