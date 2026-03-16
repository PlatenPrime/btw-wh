import {
  AlertTriangle,
  Bookmark,
  Building2,
  Factory,
  FileQuestion,
  LayoutTemplate,
  Link2,
  MapPin,
  PackageSearch,
  Projector,
  Route,
  Rows4,
  Settings,
  ShoppingCart,
  StickyNote,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

const icons = {
  StickyNote,
  Settings,
  Warehouse,
  Rows4,
  MapPin,
  FileQuestion,
  AlertTriangle,
  Route,
  LayoutTemplate,
  PackageSearch,
  Truck,
  Factory,
  Users,
  Building2,
  Bookmark,
  Link2,
  Projector,
  ShoppingCart,
  TrendingUp,
} as const;

type SidebarIconName = keyof typeof icons;

const iconColorClasses: Record<SidebarIconName, string> = {
  // Артикули — синий
  StickyNote:
    "text-[oklch(0.6_0.16_250)] dark:text-[oklch(0.74_0.18_250)]",
  Settings:
    "text-[oklch(0.62_0.09_260)] dark:text-[oklch(0.78_0.07_260)]",
  Warehouse:
    "text-[oklch(0.56_0.12_210)] dark:text-[oklch(0.72_0.12_210)]",
  // Ряди — серый, низкая насыщенность
  Rows4:
    "text-[oklch(0.65_0.02_260)] dark:text-[oklch(0.8_0.02_260)]",
  MapPin:
    "text-[oklch(0.67_0.15_35)] dark:text-[oklch(0.78_0.16_35)]",
  // Запити — фиолетовый
  FileQuestion:
    "text-[oklch(0.6_0.19_290)] dark:text-[oklch(0.75_0.2_290)]",
  // Дефіцити — розовый
  AlertTriangle:
    "text-[oklch(0.7_0.21_350)] dark:text-[oklch(0.8_0.22_350)]",
  Route:
    "text-[oklch(0.56_0.16_277)] dark:text-[oklch(0.7_0.18_277)]",
  LayoutTemplate:
    "text-[oklch(0.62_0.11_260)] dark:text-[oklch(0.76_0.09_260)]",
  PackageSearch:
    "text-[oklch(0.58_0.14_195)] dark:text-[oklch(0.72_0.16_195)]",
  Truck:
    "text-[oklch(0.58_0.16_25)] dark:text-[oklch(0.72_0.18_25)]",
  Factory:
    "text-[oklch(0.6_0.14_305)] dark:text-[oklch(0.74_0.16_305)]",
  Users:
    "text-[oklch(0.58_0.11_260)] dark:text-[oklch(0.74_0.1_260)]",
  Building2:
    "text-[oklch(0.56_0.1_235)] dark:text-[oklch(0.7_0.11_235)]",
  Bookmark:
    "text-[oklch(0.64_0.13_70)] dark:text-[oklch(0.78_0.15_70)]",
  // Аналоги — лавандовый
  Link2:
    "text-[oklch(0.68_0.18_285)] dark:text-[oklch(0.8_0.2_285)]",
  Projector:
    "text-[oklch(0.58_0.16_325)] dark:text-[oklch(0.72_0.18_325)]",
  ShoppingCart:
    "text-[oklch(0.6_0.15_145)] dark:text-[oklch(0.74_0.16_145)]",
  // Продажі — зелёный
  TrendingUp:
    "text-[oklch(0.62_0.18_145)] dark:text-[oklch(0.76_0.2_145)]",
};

const getIcon = (iconName: string) => {
  if (!iconName || !(iconName in icons)) {
    return null;
  }

  const IconComponent = icons[iconName as SidebarIconName];
  const colorClass = iconColorClasses[iconName as SidebarIconName];

  return (
    <IconComponent
      className={`h-4 w-4 shrink-0 ${colorClass}`}
    />
  );
};

export const appSidebarData = {
  navMain: [
    {
      title: "Артикули",
      url: "/arts",
      items: [
        {
          title: "Артикули",
          url: "/arts/dashboard",
          iconName: "StickyNote",
        },
        {
          title: "Аналоги",
          url: "/arts/analogs",
          iconName: "Link2",
        },
        {
          title: "Зрізи",
          url: "/arts/analog-slices",
          iconName: "Projector",
        },
        {
          title: "Продажі",
          url: "/arts/sales",
          iconName: "TrendingUp",
        },
        {
          title: "Залишки",
          url: "/arts/stock-comparison",
          iconName: "Warehouse",
        },
      ],
    },
    {
      title: "Склад",
      url: "/wh",
      items: [
        {
          title: "Ряди",
          url: "/wh/rows",
          iconName: "Rows4",
        },

        {
          title: "Зони",
          url: "/wh/zones",
          iconName: "MapPin",
        },

        {
          title: "Блоки",
          url: "/wh/blocks",
          iconName: "LayoutTemplate",
        },
        {
          title: "Групи палет",
          url: "/wh/pallet-groups",
          iconName: "Route",
        },
        {
          title: "Поставки",
          url: "/wh/dels",
          iconName: "Truck",
        },
      ],
    },

    {
      title: "Поповнення",
      url: "/refiling",
      items: [
        {
          title: "Запити",
          url: "/refiling/asks",
          iconName: "FileQuestion",
        },

        {
          title: "Дефіцити",
          url: "/refiling/defs",
          iconName: "AlertTriangle",
        },
        {
          title: "Зняття",
          url: "/refiling/pulls",
          iconName: "PackageSearch",
        },
        {
          title: "Каса",
          url: "/refiling/kasks",
          iconName: "ShoppingCart",
        },
      ],
    },
    {
      title: "Адмін",
      url: "/users",
      items: [
        {
          title: "Користувачі",
          url: "/users",
          iconName: "Users",
        },
        {
          title: "Виробники",
          url: "/wh/prods",
          iconName: "Factory",
        },
        {
          title: "Конкуренти",
          url: "/wh/konks",
          iconName: "Building2",
        },
        {
          title: "Константи",
          url: "/wh/constants",
          iconName: "Bookmark",
        },
      ],
    },
  ],
};

export { getIcon };
