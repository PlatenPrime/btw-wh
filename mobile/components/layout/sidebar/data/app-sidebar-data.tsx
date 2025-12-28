import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type IconName = keyof typeof MaterialIcons.glyphMap;

export const getIcon = (iconName: string, size = 20, color?: string) => {
  const iconMap: Record<string, IconName> = {
    StickyNote: 'note',
    RefreshCcwDot: 'refresh',
    Settings: 'settings',
    Warehouse: 'warehouse',
    Rows4: 'view-list',
    MapPin: 'place',
    FileQuestion: 'help-outline',
    AlertTriangle: 'warning',
    Route: 'route',
    PackageSearch: 'inventory-2',
  };

  const mappedIcon = iconMap[iconName] || 'menu';
  // Если цвет не передан, используем цвет по умолчанию из констант
  // Вызывающий код должен использовать useIconColor() для получения правильного цвета
  const defaultColor = color || Colors.light.icon;
  return <Icon family="MaterialIcons" name={mappedIcon} size={size} color={color || defaultColor} />;
};

export const appSidebarData = {
  navMain: [
    {
      title: 'Артикули',
      url: '/(tabs)/arts',
      items: [
        {
          title: 'Артикули',
          url: '/(tabs)/arts/dashboard',
          iconName: 'StickyNote',
        },
        {
          title: 'Оновити артикули',
          url: '/(tabs)/arts/update',
          iconName: 'RefreshCcwDot',
        },
      ],
    },
    {
      title: 'Склад',
      url: '/(tabs)/warehouse',
      items: [
        {
          title: 'Ряди',
          url: '/(tabs)/warehouse/rows',
          iconName: 'Rows4',
        },
        {
          title: 'Зони',
          url: '/(tabs)/warehouse/zones',
          iconName: 'MapPin',
        },
        {
          title: 'Блоки',
          url: '/(tabs)/warehouse/blocks',
          iconName: 'Route',
        },
      ],
    },
    {
      title: 'Поповнення',
      url: '/(tabs)/refiling',
      items: [
        {
          title: 'Запити',
          url: '/(tabs)/refiling/asks',
          iconName: 'FileQuestion',
        },
        {
          title: 'Дефіцити',
          url: '/(tabs)/refiling/defs',
          iconName: 'AlertTriangle',
        },
        {
          title: 'Зняття',
          url: '/(tabs)/refiling/pulls',
          iconName: 'PackageSearch',
        },
      ],
    },
  ],
};

