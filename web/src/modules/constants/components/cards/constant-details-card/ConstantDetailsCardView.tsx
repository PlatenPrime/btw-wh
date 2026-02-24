import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ConstantDto } from "@/modules/constants/api/types";

interface ConstantDetailsCardViewProps {
  constant: ConstantDto;
}

export function ConstantDetailsCardView({
  constant,
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-mono text-sm whitespace-nowrap">
                      {key}
                    </TableCell>
                    <TableCell className="text-sm break-all whitespace-normal">
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
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
