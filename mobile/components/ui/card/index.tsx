import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import type { VariantProps } from '@/lib/tv';
import { cardStyle } from './styles';

export interface CardProps extends Omit<ViewProps, 'style'>, Omit<VariantProps<typeof cardStyle>, 'variant'> {
  className?: string;
  /**
   * Вариант отображения карточки
   */
  variant?: 'default' | 'outlined' | 'elevated';
  /**
   * Дополнительные inline стили
   * Используйте для специфичных случаев, когда нужно переопределить стили через style prop
   */
  style?: ViewStyle;
}

const Card = React.forwardRef<React.ComponentRef<typeof View>, CardProps>(
  function Card({ className, variant = 'default', style, ...props }, ref) {
    const baseClasses = cardStyle({ variant });
    const finalClassName = className 
      ? `${baseClasses} ${className}` 
      : baseClasses;
    
    return (
      <View
        ref={ref}
        {...props}
        style={style}
        className={finalClassName}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card, cardStyle };

