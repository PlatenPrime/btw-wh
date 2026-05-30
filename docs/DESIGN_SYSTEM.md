# Design System — BTW-WH (web)

Единый источник правды для визуального слоя web-приложения.

## Принципы

1. **Depth** — слои (surface-0…3), elevation-тени, не плоский лист.
2. **Restraint** — glass на карточках (surface-2) и overlay (surface-3); не на каждой ячейке `<td>` таблицы. Насыщенный цвет — у кнопок и CTA.
3. **Color = action** — насыщенность у кнопок и CTA; карточки и фон спокойные.
4. **Motion** — декоративные анимации с `motion-reduce:animate-none`.
5. **Tokens only** — без `gray-*`, `bg-white`, `hsl(var(--primary))` при OKLCH-токенах.

## Surface levels

| Token | Роль | Tailwind |
| ----- | ---- | -------- |
| `--surface-0` | Страница, ambient canvas + mesh | `background-color: var(--background)` + `--gradient-page-ambient` |
| `--surface-1` | Sidebar, header, filter bar | `bg-sidebar`, `bg-surface-1` |
| `--surface-2` | Card, input | `bg-card`, `bg-surface-2` |
| `--surface-3` | Popover, dialog, dropdown | `bg-popover`, `bg-surface-3` |

## Glass surfaces

Frosted glass: полупрозрачный фон + `backdrop-filter` + тонкая граница. Токены в `web/src/index.css` (`:root` / `.dark`).

| Token | Назначение |
| ----- | ---------- |
| `--glass-card-bg` / `--glass-card-border` / `--glass-card-highlight` | Карточки (~48% mix light / ~50% dark — иначе на почти белом `--card` glass не читается) |
| `--glass-inset-bg` | Variant `inset` в `Card` |
| `--glass-overlay-bg` | Dialog, sheet, popover, dropdown, select (~92% popover light / ~82% dark — почти непрозрачно, чтобы `text-muted-foreground` проходил WCAG на модалах) |
| `--glass-overlay-border` | Граница overlay (~70% border light / ~60% dark) |
| `--glass-panel-bg` | `FilterBar`, панели surface-1 |
| `--glass-section-bg` | Оболочка `SurfaceSection` (слабее карточек) |
| `--glass-blur` / `--glass-blur-sm` | Сила размытия (16px / 8px) |

| Utility | Когда |
| ------- | ----- |
| `glass-card` | Все варианты `Card` кроме `ghost` |
| `glass-inset` | Вложенные панели в карточке |
| `glass-overlay` | Modal / popover / menu |
| `glass-panel` | Filter bar, toolbar-панели |
| `glass-section` | `SurfaceSection` (`default`, `subtle`) |

**Правила:** не дублировать `backdrop-blur` в модулях — только utilities. `Card variant="ghost"` — без glass. `SurfaceSection variant="none"` — без оболочки (чистая grid).

**Доступность:** `@media (prefers-reduced-transparency: reduce)` и `@supports not (backdrop-filter)` — непрозрачный fallback на `var(--card)` / `var(--popover)`. Вторичный текст на overlay — `--muted-foreground` (light L≈0.37, dark L≈0.80); не ослаблять непрозрачность `--glass-overlay-bg` без проверки контраста на модалах.

Glass читается на **surface-0 с ambient-градиентом**, не на плоском непрозрачном `bg-background` в main-области.

### Page canvas

Лёгкий цветной фон, чтобы `backdrop-filter` у карточек был заметен:

| Token | Роль |
| ----- | ---- |
| `--gradient-page-ambient` | Радиальные пятна primary / accent / chart-2 |
| `--gradient-surface-subtle` | Линейный слой поверх base |
| `--gradient-page-soft` | Плавный диагональный + radial wash (без сетки) |

- Слои на `body`: page-soft → ambient → surface-subtle → `background-color`.
- [`SidebarInset`](../web/src/components/ui/sidebar.tsx): **`bg-transparent`**, чтобы canvas `body` просвечивал в main (раньше opaque `bg-background` гасил эффект).
- Utility `page-canvas` — для fullscreen-экранов без sidebar (при необходимости).
- `prefers-reduced-transparency: reduce` — только плоский `var(--background)`, градиенты отключены.

## Elevation

| Utility | Использование |
| ------- | ------------- |
| `shadow-elevation-1` | Card default |
| `shadow-elevation-2` | Card hover, dropdown |
| `shadow-elevation-3` | Sticky panels |
| `shadow-elevation-4` | Dialog, sheet |

## Typography

- **UI:** `font-sans` (Inter)
- **Display (H1 hero):** `font-display` (Merriweather)
- Scale: `text-xs` … `text-5xl`; заголовки страниц — `text-lg font-semibold` в header

## Spacing & layout

- Page: `Page` → `p-4 md:p-6 lg:p-8`, `max-w-7xl mx-auto`, `flex flex-col gap-6`
- Section: `PageSection` → `gap-4` / `gap-6`
- Grid lists: `grid gap-3` или `gap-4`
- **Запрет:** `space-x-*`, `space-y-*` → `flex gap-*` / `grid gap-*`

### `SurfaceSection` и grid

- `className` (в т.ч. `grid`, `grid-cols-*`, `flex`, `gap-*`) применяется к **content-layer** (внутренний `z-10`), не к декоративной оболочке — дочерние карточки становятся grid-items.
- Оболочку (border, padding секции) переопределять через `surfaceClassName`, вариант — `variant` (`default` | `subtle` | `none`).
- Сетка **без** glass-фона: `variant="none"` или grid на отдельном элементе (`<ul className="grid ...">` + `<li className="flex">` + `GridTileCard className="h-full w-full"`), как в `RowsGridView`.
- Паллеты / poses в ряду: `grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.

## Card patterns (`components/shared/cards/`)

| Pattern | Компонент | Когда |
| ------- | --------- | ----- |
| `grid-tile` | `GridTileCard` | Сетки arts, sku, analog |
| `list-row` | `ListRowCard` | Списки konks, asks, kasks |
| `detail-panel` | `DetailPanelCard` | Детали сущности |

Все pattern-карточки наследуют `glass-card` из [`card.tsx`](../web/src/components/ui/card.tsx). Overlay-формы — `glass-overlay` в `dialog` / `sheet` / `popover`.

## Семантика кнопок

| Действие | `Button` variant |
| -------- | -------------- |
| Создать / сохранить (главное) | `default` |
| Подтвердить / готово | `success` |
| Редактировать | `edit` или `edit-soft` (icon) |
| Просмотр / экспорт / применить фильтр | `info` или `info-soft` |
| Предупреждение | `warning` |
| Удалить | `destructive` |
| Вторичное рядом с CTA | `secondary` |
| Отмена / назад | `outline` |
| Toolbar (свернуть, theme) | `ghost` |

**Правила:** минимум одна filled semantic CTA на экран с мутацией; в диалогах не две outline; icon-actions в списках — `*-soft`, не серый ghost.

## Градиенты

Только через CSS-переменные: `--gradient-page-soft`, `--gradient-page-ambient`, `--gradient-surface-subtle`, `--gradient-primary-glow`. В JSX — `color-mix(in oklch, var(--primary) X%, transparent)`.

## Lint / review gate

В `web/src` не допускаются: `ring-gray-*`, `bg-gray-*`, `text-gray-*`, `bg-white` (кроме явного комментария-исключения).

## Anti-patterns (инвентаризация)

Hardcoded gray/white — **устранены** (2025-05). При добавлении UI сверяться с lint gate выше.

`SurfaceSection` используется в модульных списках/контейнерах — единая точка для section-background. Импорт: `@/components/shared/wrappers/SurfaceSection`.

## Импорты

Абсолютные пути от `src`: `@/components/...`, `@/modules/...`.
