/**
 * Дані для блоків «Швидкий доступ» на головній.
 * Синхронізовано з app-sidebar-data (url, title, iconName).
 */
export interface QuickLinkItem {
  url: string;
  title: string;
  iconName: string;
  description: string;
}

export const quickLinksData: QuickLinkItem[] = [
  {
    url: "/arts/dashboard",
    title: "Артикули",
    iconName: "StickyNote",
    description: "Каталог та перегляд артикулів",
  },
  {
    url: "/arts/analogs",
    title: "Аналоги",
    iconName: "Link2",
    description: "Аналоги артикулів",
  },
  {
    url: "/arts/analog-slices",
    title: "Зрізи",
    iconName: "Projector",
    description: "Зрізи аналогів",
  },
  {
    url: "/wh/rows",
    title: "Ряди",
    iconName: "Rows4",
    description: "Складські ряди та палети",
  },
  {
    url: "/wh/zones",
    title: "Зони",
    iconName: "MapPin",
    description: "Зони зберігання",
  },
  {
    url: "/wh/blocks",
    title: "Блоки",
    iconName: "LayoutTemplate",
    description: "Блоки та сегменти",
  },
  {
    url: "/wh/pallet-groups",
    title: "Групи палет",
    iconName: "Route",
    description: "Логічні групи палет та порядок",
  },
  {
    url: "/wh/dels",
    title: "Поставки",
    iconName: "Truck",
    description: "Поставки на склад",
  },
  {
    url: "/refiling/asks",
    title: "Запити",
    iconName: "FileQuestion",
    description: "Запити на поповнення",
  },
  {
    url: "/refiling/defs",
    title: "Дефіцити",
    iconName: "AlertTriangle",
    description: "Дефіцити та розрахунки",
  },
  {
    url: "/refiling/pulls",
    title: "Зняття",
    iconName: "PackageSearch",
    description: "Зняття зі складу",
  },
  {
    url: "/refiling/kasks",
    title: "Каса",
    iconName: "ShoppingCart",
    description: "Каса поповнення",
  },
  {
    url: "/users",
    title: "Користувачі",
    iconName: "Users",
    description: "Керування користувачами та доступами",
  },
  {
    url: "/wh/prods",
    title: "Виробники",
    iconName: "Factory",
    description: "Виробники",
  },
  {
    url: "/wh/konks",
    title: "Конкуренти",
    iconName: "Building2",
    description: "Конкуренти",
  },
  {
    url: "/wh/constants",
    title: "Константи",
    iconName: "Bookmark",
    description: "Довідкові константи",
  },
];
