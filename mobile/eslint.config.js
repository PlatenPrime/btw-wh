// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      '**/*.web.tsx', // Игнорируем все web-specific файлы для избежания циклических зависимостей
    ],
  },
  {
    files: ['components/ui/index.tsx'],
    rules: {
      'import/export': 'off',
    },
  },
]);
