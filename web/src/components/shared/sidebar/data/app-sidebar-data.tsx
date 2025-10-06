import { 
  StickyNote, 
  RefreshCcwDot, 
  Settings, 
  Warehouse, 
  Rows4, 
  MapPin, 
  FileQuestion, 
  AlertTriangle, 
  Route 
} from "lucide-react";

const getIcon = (iconName: string) => {
  const icons = {
    StickyNote: StickyNote,
    RefreshCcwDot: RefreshCcwDot,
    Settings: Settings,
    Warehouse: Warehouse,
    Rows4: Rows4,
    MapPin: MapPin,
    FileQuestion: FileQuestion,
    AlertTriangle: AlertTriangle,
    Route: Route,
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
          title: "Оновити базу",
          url: "/arts/update",
          iconName: "RefreshCcwDot",
        },
        {
          title: "Утиліти",
          url: "/arts/utils",
          iconName: "Settings",
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
          title: "Залишки",
          url: "/wh/stocks",
          iconName: "Warehouse",
        },
        {
          title: "Зони",
          url: "/wh/zones",
          iconName: "MapPin",
        },
        {
          title: "Утиліти",
          url: "/wh/utils",
          iconName: "Settings",
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
          title: "Послідовність",
          url: "/refiling/path",
          iconName: "Route",
        },
   
      ],
    },
  ],
};

export { getIcon };
