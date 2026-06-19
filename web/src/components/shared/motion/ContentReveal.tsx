import { cn } from "@/lib/utils";
import { motion } from "@/lib/motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";

interface ContentRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentReveal({ children, className }: ContentRevealProps) {
  return <div className={cn(motion.revealBlock, className)}>{children}</div>;
}

type ContentRevealStaggerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function ContentRevealStagger<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContentRevealStaggerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("content-reveal-stagger", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
