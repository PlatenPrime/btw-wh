import {
  AlertTriangle,
  Bookmark,
  Boxes,
  Building2,
  Factory,
  FileQuestion,
  LayoutTemplate,
  Link2,
  MapPin,
  PackageSearch,
  PieChart,
  Projector,
  Route,
  Rows4,
  ScrollText,
  Settings,
  ShoppingCart,
  StickyNote,
  TrendingUp,
  Truck,
  Upload,
  Users,
  Warehouse,
} from "lucide-react";

import { RoleType } from "@/constants/roles";

const icons = {
  StickyNote,
  Settings,
  Warehouse,
  Rows4,
  ScrollText,
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
  PieChart,
  TrendingUp,
  Boxes,
  Upload,
} as const;

type SidebarIconName = keyof typeof icons;

const iconColorClasses: Record<SidebarIconName, string> = {
  // Артикули — синий
  StickyNote:
    "text-[oklch(0.6_0.16_250)] dark:text-[oklch(0.74_0.18_250)]",
    Upload:
    "text-[oklch(0.62_0.09_260)] dark:text-[oklch(0.78_0.07_260)]",
  Settings:
    "text-[oklch(0.6_0.16_250)] dark:text-[oklch(0.74_0.18_250)]",
  Warehouse:
    "text-[oklch(0.56_0.12_210)] dark:text-[oklch(0.72_0.12_210)]",
  // Ряди — серый, низкая насыщенность
  Rows4:
    "text-[oklch(0.65_0.02_260)] dark:text-[oklch(0.8_0.02_260)]",
  ScrollText:
    "text-[oklch(0.6_0.14_25)] dark:text-[oklch(0.74_0.16_25)]",
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
  PieChart:
    "text-[oklch(0.62_0.17_180)] dark:text-[oklch(0.76_0.18_180)]",
  // Продажі — зелёный
  TrendingUp:
    "text-[oklch(0.62_0.18_145)] dark:text-[oklch(0.76_0.2_145)]",
  Boxes:
    "text-[oklch(0.58_0.12_200)] dark:text-[oklch(0.72_0.14_200)]",
};

export interface AppSidebarNavItem {
  title: string;
  url: string;
  iconName: string;
  allowedRoles?: RoleType[];
}

export interface AppSidebarNavGroup {
  title: string;
  url: string;
  /** Авто-раскрытие секции, если pathname подходит (карточка артикула, служебные /arts/* без пункта меню и т.д.) */
  pathOpenPrefix?: string;
  items: AppSidebarNavItem[];
}

export function filterVisibleSidebarNavItems(
  items: AppSidebarNavItem[],
  hasAnyRole: (roles: RoleType[]) => boolean,
): AppSidebarNavItem[] {
  return items.filter(
    (navItem) =>
      !navItem.allowedRoles || hasAnyRole(navItem.allowedRoles),
  );
}

/** Один активный пункт на группу: самый длинный url, совпадающий с pathname (exact или префикс с `/`). */
export function getActiveSidebarNavItemUrl(
  pathname: string,
  visibleItems: AppSidebarNavItem[],
): string | null {
  let best: string | null = null;
  for (const { url } of visibleItems) {
    if (pathname === url || pathname.startsWith(`${url}/`)) {
      if (!best || url.length > best.length) {
        best = url;
      }
    }
  }
  return best;
}

export function isSidebarGroupActiveForPathname(
  group: AppSidebarNavGroup,
  pathname: string,
  visibleItems: AppSidebarNavItem[],
): boolean {
  const itemMatch = visibleItems.some(
    (nav) =>
      pathname === nav.url || pathname.startsWith(`${nav.url}/`),
  );
  if (itemMatch) {
    return true;
  }
  if (
    group.pathOpenPrefix &&
    (pathname === group.pathOpenPrefix ||
      pathname.startsWith(`${group.pathOpenPrefix}/`))
  ) {
    return true;
  }
  return false;
}

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

export const appSidebarData: { navMain: AppSidebarNavGroup[] } = {
  navMain: [
    {
      title: "Артикули",
      url: "/arts",
      pathOpenPrefix: "/arts",
      items: [
        {
          title: "Артикули",
          url: "/arts/dashboard",
          iconName: "StickyNote",
          allowedRoles: [RoleType.USER],
        },
        {
          title: "Оновлення артикулів",
          url: "/arts/update",
          iconName: "Upload",
          allowedRoles: [RoleType.ADMIN],
        },
      ],
    },
    {
      title: "Аналітика",
      url: "/sku/konks",
      pathOpenPrefix: "/sku",
      items: [
        {
          title: "Конкуренти",
          url: "/sku/konks",
          iconName: "Building2",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Товарні групи",
          url: "/sku/skugrs",
          iconName: "PackageSearch",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Товари",
          url: "/sku/competitor-skus",
          iconName: "Boxes",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Продажі",
          url: "/sku/sales",
          iconName: "TrendingUp",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Залишки",
          url: "/sku/stock-comparison",
          iconName: "Warehouse",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Статистика",
          url: "/sku/statistics",
          iconName: "PieChart",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Зрізи конкуренти",
          url: "/sku/sku-slices",
          iconName: "Projector",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Зрізи Btrade",
          url: "/sku/btrade-slices",
          iconName: "Projector",
          allowedRoles: [RoleType.ADMIN],
        },
      ],
    },
    // Поповнення
    {
      title: "Поповнення",
      url: "/refiling",
      pathOpenPrefix: "/refiling",
      items: [
        {
          title: "Запити",
          url: "/refiling/asks",
          iconName: "FileQuestion",
          allowedRoles: [RoleType.USER],
        },
        {
          title: "Дефіцити",
          url: "/refiling/defs",
          iconName: "AlertTriangle",
          allowedRoles: [RoleType.USER],
        },
        {
          title: "Зняття",
          url: "/refiling/pulls",
          iconName: "PackageSearch",
          allowedRoles: [RoleType.USER],
        },
        {
          title: "Каса",
          url: "/refiling/kasks",
          iconName: "ShoppingCart",
          allowedRoles: [RoleType.USER],
        },
      ],
    },
    // Склад
    {
      title: "Склад",
      url: "/wh",
      pathOpenPrefix: "/wh",
      items: [
        {
          title: "Ряди",
          url: "/wh/rows",
          iconName: "Rows4",
          allowedRoles: [RoleType.USER],
        },
        {
          title: "Зони",
          url: "/wh/zones",
          iconName: "MapPin",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Блоки",
          url: "/wh/blocks",
          iconName: "LayoutTemplate",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Групи палет",
          url: "/wh/pallet-groups",
          iconName: "Route",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Поставки",
          url: "/wh/dels",
          iconName: "Truck",
          allowedRoles: [RoleType.ADMIN],
        },
      ],
    },
    // Аналоги
    {
      title: "Аналоги",
      url: "/analogs",
      pathOpenPrefix: "/analogs",
      items: [
        {
          title: "Аналоги",
          url: "/analogs",
          iconName: "Link2",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Зрізи",
          url: "/analogs/slices",
          iconName: "Projector",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Продажі",
          url: "/analogs/sales",
          iconName: "TrendingUp",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Залишки",
          url: "/analogs/stock-comparison",
          iconName: "Warehouse",
          allowedRoles: [RoleType.ADMIN],
        },
      ],
    },
    // Аналітика
 
    {
      title: "Довідники",
      url: "/wh/prods",
      pathOpenPrefix: "/wh/prods",
      items: [
        {
          title: "Виробники",
          url: "/wh/prods",
          iconName: "Factory",
          allowedRoles: [RoleType.USER],
        },
      ],
    },
    {
      title: "Адміністрування",
      url: "/admin/events",
      pathOpenPrefix: "/admin",
      items: [
        {
          title: "Користувачі",
          url: "/admin/users",
          iconName: "Users",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Константи",
          url: "/admin/constants",
          iconName: "Bookmark",
          allowedRoles: [RoleType.ADMIN],
        },
        {
          title: "Події",
          url: "/admin/events",
          iconName: "ScrollText",
          allowedRoles: [RoleType.ADMIN],
        },
      ],
    },
  ],
};

export { getIcon };

