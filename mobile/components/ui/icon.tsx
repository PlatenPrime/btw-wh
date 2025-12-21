import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type IconFamily =
  | 'MaterialIcons'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Ionicons'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo'
  | 'MaterialCommunityIcons';

interface IconProps {
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

const iconComponents = {
  MaterialIcons,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} as const;

export const Icon: React.FC<IconProps> = ({ family, name, size = 24, color, style }) => {
  const IconComponent = iconComponents[family];

  if (!IconComponent) {
    console.warn(`Icon family "${family}" not found, falling back to MaterialIcons`);
    return <MaterialIcons name={name as any} size={size} color={color} style={style} />;
  }

  return <IconComponent name={name as any} size={size} color={color} style={style} />;
};

// Export individual icon components for convenience
export { MaterialIcons, FontAwesome5, FontAwesome6, Ionicons, Feather, AntDesign, Entypo, MaterialCommunityIcons };

// Helper function to get icon component by family
export const getIconComponent = (family: IconFamily) => {
  return iconComponents[family] || MaterialIcons;
};

