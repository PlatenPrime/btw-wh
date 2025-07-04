import type { UploadingArt } from "../../types";

interface PreviewTableProps {
  preview: UploadingArt[];
}

export function PreviewTable({ preview }: PreviewTableProps) {
  return (
    <div>
      {preview.length > 0 && (
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
            Попередній перегляд даних:
          </h3>
          <div className="max-h-48 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800">
                <tr className="">
                  <th className="px-3 py-2 text-center">artikul</th>
                  <th className="px-3 py-2 text-center">zone</th>
                  <th className="px-3 py-2">namerus</th>
                  <th className="px-3 py-2">nameukr</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="even:bg-zinc-50 dark:even:bg-zinc-800">
                    <td className="px-3 py-1 text-center">{row.artikul}</td>
                    <td className="px-3 py-1 text-center">{row.zone}</td>
                    <td className="px-3 py-1">{row.namerus}</td>
                    <td className="px-3 py-1">{row.nameukr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
