import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputUploaderProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputUploader({ handleFileUpload }: InputUploaderProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="w-full py-9 bg-slate-500/10  rounded-2xl border border-gray-300 gap-3 grid border-dashed">
        
        <div className="grid gap-2">
          <h3 className="text-center text-foreground text-sm font-medium leading-snug">
            Оберіть файл Excel для завантаження:
          </h3>
          <div className="grid gap-1">
          <h4 className="text-center text-muted-foreground   text-xs leading-4">
            Тільки формат <code>.xlsx</code>.
          </h4>
        </div>
          <div className="flex items-center justify-center">
            <Label htmlFor="excel-upload" className="">
              <Input
                id="excel-upload"
                type="file"
                hidden
                accept=".xlsx"
                onChange={handleFileUpload}
              />
              <div className="flex w-28 h-9 px-2 flex-col bg-emerald-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                Вибрати
              </div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
