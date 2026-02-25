import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardActionsMenu, type CardAction } from "@/components/shared/card-actions";
import type { ConstantDto } from "@/modules/constants/api/types";
import type { ConstantEntry } from "@/modules/constants/components/dialogs/edit-constant-entry-dialog";

interface ConstantDetailsCardViewProps {
  constant: ConstantDto;
  canEdit: boolean;
  onEditEntry: (entry: ConstantEntry) => void;
  onDeleteEntry: (entry: ConstantEntry) => void;
}

export function ConstantDetailsCardView({
  constant,
  canEdit,
  onEditEntry,
  onDeleteEntry,
}: ConstantDetailsCardViewProps) {
  const entries = Object.entries(constant.data ?? {});

  return (
    <Card className="p-2">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="p-0">{constant.title}</CardTitle>
        <span className="text-muted-foreground text-sm">{constant.name}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        {entries.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1%] whitespace-nowrap">
                    Ключ
                  </TableHead>
                  <TableHead>Значення</TableHead>
                  {canEdit && (
                    <TableHead className="w-[1%] whitespace-nowrap text-right">
                      Дії
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map(([key, value]) => {
                  const entry: ConstantEntry = {
                    key,
                    value,
                  };

                  const actions: CardAction[] = canEdit
                    ? [
                        {
                          id: "edit",
                          label: "Редагувати",
                          variant: "default",
                          onClick: () => onEditEntry(entry),
                        },
                        {
                          id: "delete",
                          label: "Видалити",
                          variant: "destructive",
                          iconColor: "red",
                          onClick: () => onDeleteEntry(entry),
                        },
                      ]
                    : [];

                  return (
                    <TableRow key={key}>
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        {key}
                      </TableCell>
                      <TableCell className="text-sm break-all whitespace-normal">
                        {value}
                      </TableCell>
                      {canEdit && (
                        <TableCell className="w-[1%] whitespace-nowrap text-right">
                          <CardActionsMenu actions={actions} />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Дані порожні</p>
        )}
      </CardContent>
    </Card>
  );
}
