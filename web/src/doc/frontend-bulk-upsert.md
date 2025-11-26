# Bulk Upsert Cheatsheet (Blocks & Segs)

Single source of truth for the new mass-update controllers that sync the warehouse structure в один round-trip. Фронтенд больше не зовёт десятки `PUT`-эндпоинтов — теперь всё едет через `bulk` мутатор.

## `/api/blocks/upsert`

| Item        | Notes                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Method      | `POST`                                                                                             |
| Auth        | Bearer + ADMIN                                                                                     |
| Body        | `Array<{ _id?: string; title: string; order: number; segs?: string[] }>`                           |
| Matching    | `_id` (генерится сервером, если не передали)                                                       |
| Constraints | titles уникальны внутри payload (case-insensitive), `order >= 1`, `segs` должны принадлежать блоку |
| Response    | `{ bulkResult, updatedBlocks }`                                                                    |

UI tips:

- Клиентский стор (Zustand / React Query cache) — источник истины; после dnd меняем локально и вызываем bulk сохранение.
- Не передавайте `segs`, если просто меняете order, чтобы не перетирать массив на бэке.
- `/api/blocks/recalculate-zones-sectors` дергаем только после того, как все bulk операции стабилизировались.

## `/api/segs/upsert`

| Item        | Notes                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Method      | `POST`                                                                                                                          |
| Auth        | Bearer + ADMIN                                                                                                                  |
| Body        | `Array<{ _id?: string; blockId: string; order: number; zones: string[] }>`                                                      |
| Matching    | `_id`                                                                                                                           |
| Constraints | `zones` уникальны внутри payload, блок должен существовать, зоны нельзя привязать к чужим сегам, запрещён перенос между блоками |
| Response    | `{ processedSegs }`                                                                                                             |

UI tips:

- Валидируйте дубликаты и пустые массивы на клиенте — сервер отдаст `400` c `errors[]`, но лучше подсветить до запроса.
- После dnd сразу сохраняйтесь bulk-ом — сервер пересчитает секторы внутри блока автоматически.
- Удалённые зоны получат `seg = null`, `sector = 0`; инвалидируйте `["zones"]`, `["segs"]`, `["blocks"]`.

## Единый React Query flow

```ts
import { useBulkStructureMutation } from "@/modules/blocks/api/hooks/mutations/useBulkStructureMutation";

const useSaveBlocksOrder = (blocks: BlockDto[], original: BlockDto[]) => {
  const bulkMutation = useBulkStructureMutation();

  return async () => {
    const payload = buildBlockPayload(blocks, original); // только изменённые порядки
    if (payload.length === 0) return;

    await bulkMutation.mutateAsync({
      scope: "blocks",
      blocksPayload: payload,
      optimisticUpdater: (qc) => patchBlocksCache(qc, blocks),
      extraInvalidations: payload.map(({ _id }) => ["blocks", _id]),
    });
  };
};
```

`useBulkStructureMutation` сам:

- собирает вызовы `/api/blocks/upsert` и `/api/segs/upsert` (по scope),
- оборачивает optimistic update / rollback,
- нормализует ошибки (`errors[]` -> toasts) и инвалидирует `["blocks"]`, `["segs"]`, `["zones"]` + переданные ключи.

## Error handling

Оба контроллера возвращают `400` c `errors[]` (детальное сообщение + `path`). Показывайте toasts, мапьте `path.join(".")`. Для неожиданных ошибок выводите `message`.

## Payload best practices

- Держите payload минимальным — только изменённые сущности. Чем меньше отправляем, тем быстрее Mongo bulk и проще отладка.
- Для order-драг-н-дропа достаточно `_id`, `title`, `order`; списки `segs/zones` отправляйте лишь в момент синхронизации составов.
- Пакуйте блоки и сегменты одним вызовом мутатора (`scope: "all"`), когда меняете всю иерархию целиком.
