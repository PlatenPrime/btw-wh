export const isExcelFile = (file: File): boolean => {
  const excelMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const excelExtensions = [".xlsx", ".xls"];

  return (
    excelMimeTypes.includes(file.type) ||
    excelExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  );
};

