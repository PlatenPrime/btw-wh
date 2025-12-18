import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

export type IconName = keyof typeof MaterialIcons.glyphMap;

export const getIcon = (iconName: string, size = 20, color = '#000') => {
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
  return <MaterialIcons name={mappedIcon} size={size} color={color} />;
};

export const appSidebarData = {
  navMain: [
    {
      title: 'Артикули',
      url: '/arts',
      items: [
        {
          title: 'Артикули',
          url: '/arts/dashboard',
          iconName: 'StickyNote',
        },
        {
          title: 'Оновити артикули',
          url: '/arts/update',
          iconName: 'RefreshCcwDot',
        },
      ],
    },
    {
      title: 'Склад',
      url: '/wh',
      items: [
        {
          title: 'Ряди',
          url: '/wh/rows',
          iconName: 'Rows4',
        },
        {
          title: 'Зони',
          url: '/wh/zones',
          iconName: 'MapPin',
        },
        {
          title: 'Блоки',
          url: '/wh/blocks',
          iconName: 'Route',
        },
      ],
    },
    {
      title: 'Поповнення',
      url: '/refiling',
      items: [
        {
          title: 'Запити',
          url: '/refiling/asks',
          iconName: 'FileQuestion',
        },
        {
          title: 'Дефіцити',
          url: '/refiling/defs',
          iconName: 'AlertTriangle',
        },
        {
          title: 'Зняття',
          url: '/refiling/pulls',
          iconName: 'PackageSearch',
        },
      ],
    },
  ],
};

