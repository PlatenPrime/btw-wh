# BTW-WH Mobile

Мобильное приложение BTW-WH на React Native с использованием Expo.

## 🚀 Быстрый старт

### Запуск приложения

```bash
# Из корня monorepo
npm run mobile:start

# Для запуска на Android
npm run mobile:android

# Для запуска на iOS (требуется macOS)
npm run mobile:ios

# Для запуска в web-браузере
cd mobile && npm run web
```

### Или из директории mobile

```bash
cd mobile

# Запуск Expo Dev Server
npm start

# Для конкретной платформы
npm run android
npm run ios
npm run web
```

## 📦 Структура проекта

```
mobile/
├── App.tsx           # Главный компонент приложения
├── index.ts          # Точка входа (регистрация root component)
├── app.json          # Конфигурация Expo
├── package.json      # Зависимости и скрипты
├── tsconfig.json     # Конфигурация TypeScript
└── assets/           # Изображения и ресурсы
```

## 🔧 Технологии

- **Expo ~54.0** - Фреймворк для React Native
- **React Native 0.81.4** - Мобильный UI фреймворк
- **TypeScript ~5.9** - Типизация
- **@btw-wh/shared** - Общий код с web-приложением

## 📱 Разработка

### Интеграция с Shared модулем

Все общие модули, API клиенты, хуки и константы доступны через `@btw-wh/shared`:

```typescript
import { RoleType, getRoleLabel, apiClient } from "@btw-wh/shared";
```

### Path Aliases

Настроен path alias `@/` для абсолютных импортов:

```typescript
import { Component } from "@/components/Component";
```

## 📄 Конфигурация

### app.json

Основная конфигурация Expo приложения:

- Название, версия, slug
- Иконки и splash screen
- Платформо-специфичные настройки (iOS, Android, Web)
- New Architecture включена (`newArchEnabled: true`)

### package.json

- Зависимость на `@btw-wh/shared` для общего кода
- Скрипты для запуска на разных платформах

### tsconfig.json

- Расширяет `expo/tsconfig.base`
- Strict mode включен
- Path alias `@/*` для абсолютных импортов

## 🔗 Связанные ресурсы

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Monorepo root](../README.md)
- [Shared module](../shared/README.md)
