import type { VariantProps } from "@/lib/tv";
import React from "react";
import { cardStyle } from "./styles";

export interface CardProps
  extends React.ComponentPropsWithoutRef<"div">,
    Omit<VariantProps<typeof cardStyle>, "variant"> {
  className?: string;
  /**
   * Вариант отображения карточки
   */
  variant?: "default" | "outlined" | "elevated";
  /**
   * Дополнительные inline стили
   * Используйте для специфичных случаев, когда нужно переопределить стили через style prop
   */
  style?: React.CSSProperties;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "default", style, ...props },
  ref
) {
  const baseClasses = cardStyle({ variant });
  const finalClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return <div ref={ref} {...props} style={style} className={finalClassName} />;
});

Card.displayName = "Card";

export { Card, cardStyle };
