import React from "react";
import * as XLSX from "xlsx";
import type { ArtDto } from "../../types/dto";

export  const ExcelUploader = () => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: "" }) as ArtDto[];

      const formatted = json.map((row) => ({
        artikul: row.artikul?.toString().trim(),
        zone: row.zone?.toString().trim(),
        namerus: row.namerus?.toString().trim(),
        nameukr: row.nameukr?.toString().trim(),
      })).filter((row) => row.artikul); // удаляем пустые

      console.log("Отправляемые данные:", formatted);
      

      try {
        const res = await fetch("https://btw-wh.up.railway.app/api/arts/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatted),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Импорт завершён успешно ✅");
          console.log(result);
        } else {
          alert("Ошибка при импорте ❌");
          console.error(result);
        }
      } catch (err) {
        alert("Сетевая ошибка ❌");
        console.error(err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4 border rounded shadow">
      <label className="block mb-2 font-semibold">Загрузите Excel файл (.xlsx):</label>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="border px-2 py-1"
      />
    </div>
  );
};


