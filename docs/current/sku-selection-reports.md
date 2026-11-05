# Фронтенд: отчёты по выбранным SKU

## Задача

Дать пользователю мультивыбор карточек SKU (не обязательно одного конкурента) и за период получить:

1. Excel движения остатков;
2. Excel продаж с долями каждого SKU от суммы выбранных (шт и выручка);
3. JSON для двух круговых диаграмм (доля по штукам / доля по выручке).

Scope: явный список `_id` **или** флаг `selectAll` + критерии поиска (как `GET /skus`).

## API

Auth: JWT, роль ≥ ADMIN.

### Excel (асинхронно)

Поток: `POST /api/excel-jobs` → poll → download по token.

| Действие         | kind                  | params |
| ---------------- | --------------------- | ------ |
| Остатки          | `sku-selection-stock` | scope + `dateFrom`, `dateTo`; опционально `metrics`: `stock`/`price` |
| Продажи + частки | `sku-selection-sales` | scope + `dateFrom`, `dateTo`; опционально `metrics`: `sales`/`price`/`revenue` |

**Scope (взаимоисключение):**

1. Ручной: `{ skuIds: ObjectId[] }` — **≥ 1, без верхнего лимита**, порядок = UI.
2. Все по выборке: `{ selectAll: true, search?, konkName?, prodName? }` — те же фильтры, что у каталога SKU; пустые поля не слать. **`skuIds` не слать.**

Даты: `YYYY-MM-DD`, `dateFrom` ≤ `dateTo`.

В sales xlsx после итогов есть блок «Частки за період». Pie из xlsx не строить.

### Pie (синхронно)

- `POST /api/sku-chart-reports/selection/skus-pie`
- Body: тот же scope (`skuIds` XOR `selectAll`+filters) + `dateFrom`, `dateTo`
- Ответ: `data[skuId]` с `salesPcs`, `salesUah`, `sharePcs`, `shareUah` + `all`

## UX

### Точка входа

- Диалоги Excel на экране товарів конкурентів («Excel залишки/продажі (обрані)»).
- Wizard excel-report-order (entry `search-skus`).
- `/sku/comparison/skus` — кругові діаграми.

### Multi-select

- Фільтри конкурент / виробник (порожнє = усі).
- Каталог вантажиться лише після кнопки «Знайти» (локальний `run`).
- Показувати **Знайдено N** (`pagination.total`).
- Чекбокси без чипів з ×; ліміту кількості немає.
- «Вибрати всі» → confirm → `selectAll=true` (у вибірку потрапляють і не завантажені сторінки).
- На pie-сторінці окремо URL `run=1` + кнопка «Показати» для pie-фетчу.

### Поведінка

1. Submit disabled, доки немає `(selectAll || skuIds.length ≥ 1)` і валідного періоду (і metrics для Excel).
2. Excel: один job за клік; polling як у інших excel-jobs.
3. Pie: POST після `run=1`; loading на блоці діаграм.
4. Відсутні id / 0 matches після resolve → 404 / failed job.

### Не робити

- Не ходити на старі GET `/api/sku-excel-reports/...` для selection.
- Не будувати pie з xlsx.
- Не змішувати з `sku-konk-*` / `sku-skugr-*`.
- Не слати одночасно `selectAll` і `skuIds`.
- Не обрізати вибірку штучним max (100 знято).
