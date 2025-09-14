import { Card, CardContent } from "@/components/ui/card";

interface TotalItemProps {
  quant: number;
  icon: React.ReactNode;
}

export function TotalItem({  quant, icon }: TotalItemProps) {
  return (
    <Card className="gap-0 p-0 ">
      <CardContent className="flex items-center gap-1 px-2">
        {icon} <div className="">{quant || 0}</div>
      </CardContent>
    </Card>
  );
}
