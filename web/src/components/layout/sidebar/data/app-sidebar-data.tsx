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

const getIcon = (iconName: string) => {
  const icons = {
    StickyNote: StickyNote,
    Settings: Settings,
    Warehouse: Warehouse,
    Rows4: Rows4,
    MapPin: MapPin,
    FileQuestion: FileQuestion,
    AlertTriangle: AlertTriangle,
    Route: Route,
    LayoutTemplate: LayoutTemplate,
    PackageSearch: PackageSearch,
    Truck: Truck,
    Factory: Factory,
    Users: Users,
    Building2: Building2,
    Bookmark: Bookmark,
    Link2: Link2,
    Projector: Projector,
    ShoppingCart: ShoppingCart,
    TrendingUp: TrendingUp,
  };

  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
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
