/**
 * Парсит заголовок Content-Disposition и извлекает имя файла
 * Поддерживает RFC 5987 формат (filename*) для корректной обработки не-ASCII символов
 *
 * @param contentDisposition - Значение заголовка Content-Disposition
 * @param fallbackFilename - Имя файла по умолчанию, если не удалось распарсить заголовок
 * @returns Имя файла, извлеченное из заголовка или fallback значение
 *
 * @example
 * parseContentDisposition('attachment; filename="test.xlsx"; filename*=UTF-8\'\'test.xlsx', 'default.xlsx')
 * // returns: 'test.xlsx'
 */
export function parseContentDisposition(
  contentDisposition: string | undefined,
  fallbackFilename: string,
): string {
  if (!contentDisposition) {
    return fallbackFilename;
  }

  // Приоритетно пытаемся найти filename* (RFC 5987 формат)
  // Формат: filename*=charset'lang'encoded-filename
  // Пример: filename*=UTF-8''%D0%A2%D0%B5%D1%81%D1%82.xlsx
  const filenameStarMatch = contentDisposition.match(/filename\*=([^;]+)/i);
  if (filenameStarMatch) {
    let filenameStarValue = filenameStarMatch[1].trim();
    
    // Убираем кавычки если есть
    filenameStarValue = filenameStarValue.replace(/^["']|["']$/g, "");

    // Извлекаем кодировку и закодированное имя файла
    // Формат: charset'lang'encoded (RFC 5987)
    // Обычно: UTF-8''encoded (два апострофа - один для пустого языка)
    const encodingMatch = filenameStarValue.match(/^([^']+)''(.+)$/);
    if (encodingMatch) {
      const encodedFilename = encodingMatch[2];
      try {
        // Декодируем процентно-закодированное значение
        const decoded = decodeURIComponent(encodedFilename);
        if (decoded) {
          return decoded;
        }
      } catch (error) {
        // Если декодирование не удалось, продолжаем искать другие варианты
        console.warn("Failed to decode filename*:", error);
      }
    } else {
      // Если формат не стандартный, пытаемся декодировать как есть
      try {
        const decoded = decodeURIComponent(filenameStarValue);
        if (decoded) {
          return decoded;
        }
      } catch (error) {
        console.warn("Failed to decode filename* value:", error);
      }
    }
  }

  // Fallback на обычный filename
  // Форматы: filename="value" или filename=value
  const filenameMatch = contentDisposition.match(/filename[^=]*=\s*"([^"]+)"|filename[^=]*=\s*([^;,\s]+)/i);
  if (filenameMatch) {
    const filename = (filenameMatch[1] || filenameMatch[2] || "").trim();
    if (filename) {
      return filename;
    }
  }

  // Если ничего не найдено, возвращаем fallback
  return fallbackFilename;
}

