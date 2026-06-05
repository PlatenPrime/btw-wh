import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

interface DelsExcelSheetLinkViewProps {
  url: string;
}

export function DelsExcelSheetLinkView({ url }: DelsExcelSheetLinkViewProps) {
  return (
    <Button asChild variant="success" className="w-fit self-start">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <FileSpreadsheet />
        Відкрити таблицю поставок
      </a>
    </Button>
  );
}
