const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Путь к корню monorepo
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// Настройка для работы с monorepo
config.watchFolders = [monorepoRoot];

// Добавляем node_modules из корня monorepo и из shared
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Убеждаемся, что Metro может резолвить shared модуль
config.resolver.extraNodeModules = {
  "@btw-wh/shared": path.resolve(monorepoRoot, "shared"),
};

module.exports = config;
