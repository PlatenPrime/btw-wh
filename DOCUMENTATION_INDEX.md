# BTW-WH Documentation Index

Навигация по всей документации проекта.

## 🎯 Быстрый старт

| Что нужно                 | Файл                                               |
| ------------------------- | -------------------------------------------------- |
| Начать работу с mobile    | [`mobile/QUICK_START.md`](./mobile/QUICK_START.md) |
| Понять архитектуру shared | [`shared/README.md`](./shared/README.md)           |
| Быстрый справочник        | [`CHEATSHEET.md`](./CHEATSHEET.md)                 |
| Общий обзор миграции      | [`MIGRATION_COMPLETE.md`](./MIGRATION_COMPLETE.md) |

## 📚 Документация по модулям

### Shared (общий код)

- [`shared/README.md`](./shared/README.md) - Как использовать shared пакет
  - Инфраструктура (Config, Storage, API Client)
  - Модули API (Auth, Arts, Asks, Defs, Pallets, Poses, Rows)
  - Примеры использования
  - Зависимости

### Mobile

- [`mobile/README.md`](./mobile/README.md) - Обзор mobile приложения
- [`mobile/QUICK_START.md`](./mobile/QUICK_START.md) - **НАЧНИ ОТСЮДА** для mobile
- [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md) - Полное руководство
  - Настройка проекта (apiClient, провайдеры)
  - Структура навигации
  - Все модули с примерами кода
  - Компоненты и паттерны
  - Troubleshooting
- [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md) - Справочник API
  - Быстрые примеры всех сервисов
  - Query keys
  - Типы данных
  - Error handling
- [`mobile/MIGRATION_PLAN.md`](./mobile/MIGRATION_PLAN.md) - План миграции mobile
  - Текущее состояние
  - Пошаговый план
  - Чек-лист
  - Временные оценки

### Web

- [`WEB_MIGRATION_COMPLETE.md`](./WEB_MIGRATION_COMPLETE.md) - Детали web миграции
  - Что было сделано
  - Созданные адаптеры
  - Обновленные импорты
  - Как использовать новый API
- [`web/src/doc/modules-architecture.md`](./web/src/doc/modules-architecture.md) - Архитектура модулей
  - Паттерн Fetcher-Container-View
  - Структура модулей
  - API слой (services, hooks, types)

## 🗺️ Миграция

### Общие документы

- [`MIGRATION_COMPLETE.md`](./MIGRATION_COMPLETE.md) - **Итоговая сводка**
  - Обзор выполненной работы
  - Статистика (файлы, строки кода)
  - Архитектурные решения
  - Следующие шаги
- [`MIGRATION_STATUS.md`](./MIGRATION_STATUS.md) - Текущий статус
  - Shared пакет: 100% ✅
  - Web миграция: 100% ✅
  - Mobile документация: 100% ✅
  - Mobile разработка: 0% ⏳
- [`WEB_MIGRATION_COMPLETE.md`](./WEB_MIGRATION_COMPLETE.md) - Web детали

### Специфичные для модулей

- [`web/src/modules/README.md`](./web/src/modules/README.md) - Архитектура модулей web
- [`mobile/src/modules/README.md`](./mobile/src/modules/README.md) - Структура mobile модулей

## 🔧 Справочники

### Для разработчиков

- [`CHEATSHEET.md`](./CHEATSHEET.md) - **Быстрая шпаргалка**
  - Импорты
  - Сервисы
  - Хуки
  - Query keys
  - Роли
  - Команды
- [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md) - Подробный API справочник
  - Все модули
  - Примеры запросов
  - Типы данных
  - Best practices

### Для архитекторов

- [`shared/README.md`](./shared/README.md) - Архитектура shared
- [`web/src/doc/modules-architecture.md`](./web/src/doc/modules-architecture.md) - Паттерны web
- [`MIGRATION_COMPLETE.md`](./MIGRATION_COMPLETE.md) - Архитектурные решения

## 📖 Руководства по разработке

### Mobile разработка

1. [`mobile/QUICK_START.md`](./mobile/QUICK_START.md) - Быстрый старт
2. [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md) - Полное руководство
3. [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md) - Справочник API
4. [`mobile/MIGRATION_PLAN.md`](./mobile/MIGRATION_PLAN.md) - План миграции

### Web разработка

1. [`WEB_MIGRATION_COMPLETE.md`](./WEB_MIGRATION_COMPLETE.md) - Как работает новый код
2. [`web/src/doc/modules-architecture.md`](./web/src/doc/modules-architecture.md) - Архитектура
3. `web/src/modules/*/README.md` - Документация модулей

### Shared разработка

1. [`shared/README.md`](./shared/README.md) - Использование shared
2. Inline JSDoc в коде - документация функций

## 🎓 Обучение

### Новый разработчик Mobile

1. Прочитай [`mobile/QUICK_START.md`](./mobile/QUICK_START.md)
2. Изучи примеры в [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md)
3. Посмотри как работает web: `web/src/modules/arts/`
4. Начни с простого экрана (LoginScreen)
5. Используй [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md) как справочник

### Новый разработчик Web

1. Прочитай [`WEB_MIGRATION_COMPLETE.md`](./WEB_MIGRATION_COMPLETE.md)
2. Изучи архитектуру: [`web/src/doc/modules-architecture.md`](./web/src/doc/modules-architecture.md)
3. Посмотри примеры: `web/src/modules/arts/`
4. Используй [`CHEATSHEET.md`](./CHEATSHEET.md) для импортов

### Работа с Shared

1. Прочитай [`shared/README.md`](./shared/README.md)
2. Изучи структуру: `shared/modules/`
3. Понять паттерны: Factory, DI в [`MIGRATION_COMPLETE.md`](./MIGRATION_COMPLETE.md)

## 🔍 Поиск информации

| Что искать           | Где искать                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Как использовать API | [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md) или [`CHEATSHEET.md`](./CHEATSHEET.md)      |
| Примеры компонентов  | [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md)                       |
| Типы данных          | `@shared/modules/*/api/types` или [`mobile/API_REFERENCE.md`](./mobile/API_REFERENCE.md)           |
| Навигация mobile     | [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md) → Структура навигации |
| Роли и права         | [`CHEATSHEET.md`](./CHEATSHEET.md) → Роли или `shared/constants/roles.ts`                          |
| Архитектура модулей  | [`web/src/doc/modules-architecture.md`](./web/src/doc/modules-architecture.md)                     |
| Проблемы и решения   | [`mobile/MOBILE_DEVELOPMENT_GUIDE.md`](./mobile/MOBILE_DEVELOPMENT_GUIDE.md) → Troubleshooting     |

## 📦 Структура проекта

```
btw-wh/
├── shared/                          # Общий код
│   ├── README.md                    # 📖 Документация shared
│   └── ...
├── web/                             # Web приложение
│   ├── src/doc/
│   │   └── modules-architecture.md  # 📖 Архитектура модулей
│   └── ...
├── mobile/                          # Mobile приложение
│   ├── README.md                    # 📖 Обзор
│   ├── QUICK_START.md               # 🚀 Быстрый старт
│   ├── MOBILE_DEVELOPMENT_GUIDE.md  # 📚 Полное руководство
│   ├── API_REFERENCE.md             # 📋 Справочник API
│   ├── MIGRATION_PLAN.md            # 📝 План миграции
│   └── ...
├── DOCUMENTATION_INDEX.md           # 📑 Этот файл
├── MIGRATION_COMPLETE.md            # 🎉 Итоговая сводка миграции
├── MIGRATION_STATUS.md              # 📊 Текущий статус
├── WEB_MIGRATION_COMPLETE.md        # ✅ Web миграция
├── CHEATSHEET.md                    # ⚡ Быстрая шпаргалка
└── package.json                     # Root workspace
```

## 🎯 Карта зависимостей документов

```
Новый Mobile разработчик
  └─> mobile/QUICK_START.md
       └─> mobile/MOBILE_DEVELOPMENT_GUIDE.md
            └─> mobile/API_REFERENCE.md
                 └─> shared/README.md

Новый Web разработчик
  └─> WEB_MIGRATION_COMPLETE.md
       └─> web/src/doc/modules-architecture.md
            └─> shared/README.md

Архитектор / Team Lead
  └─> MIGRATION_COMPLETE.md
       └─> MIGRATION_STATUS.md
            ├─> shared/README.md
            ├─> WEB_MIGRATION_COMPLETE.md
            └─> mobile/MOBILE_DEVELOPMENT_GUIDE.md

Быстрый поиск
  └─> CHEATSHEET.md
       └─> mobile/API_REFERENCE.md
```

## 📞 Контакты

**Вопросы по:**

- **Shared API** → `shared/README.md`
- **Mobile разработке** → `mobile/MOBILE_DEVELOPMENT_GUIDE.md`
- **Web архитектуре** → `web/src/doc/modules-architecture.md`
- **Быстрый ответ** → `CHEATSHEET.md`

---

**Последнее обновление:** October 2025  
**Версия:** 1.0.0  
**Статус:** ✅ Web Complete | 📖 Mobile Documented | ⏳ Mobile In Progress
