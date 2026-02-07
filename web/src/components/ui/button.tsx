import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-out active:scale-[0.98] hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground tracking-tight shadow-[0_1px_0_0_theme(colors.primary.foreground/0.08)_inset,0_2px_4px_-1px_var(--shadow-color)/0.12,0_4px_8px_-2px_var(--shadow-color)/0.08] hover:bg-primary/95 hover:shadow-[0_1px_0_0_theme(colors.primary.foreground/0.06)_inset,0_4px_12px_-2px_var(--shadow-color)/0.15,0_8px_16px_-4px_var(--shadow-color)/0.1] active:shadow-[0_1px_2px_var(--shadow-color)/0.08]",
        destructive:
          "bg-destructive text-white shadow-[0_2px_4px_-1px_var(--shadow-color)/0.12,0_4px_8px_-2px_var(--shadow-color)/0.08] hover:bg-destructive/90 hover:shadow-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        "super-destructive":
          "bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl focus-visible:ring-red-500/50 focus-visible:ring-[4px] animate-in dark:bg-red-600 dark:hover:bg-red-700 border-2 border-red-700 dark:border-red-500 transition-all duration-200",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:shadow-[0_1px_3px_var(--shadow-color)/0.08] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-[0_1px_3px_var(--shadow-color)/0.08]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success text-success-foreground tracking-tight shadow-[0_1px_0_0_theme(colors.success.foreground/0.08)_inset,0_2px_4px_-1px_var(--shadow-color)/0.12,0_4px_8px_-2px_var(--shadow-color)/0.08] hover:bg-success/95 hover:shadow-[0_1px_0_0_theme(colors.success.foreground/0.06)_inset,0_4px_12px_-2px_var(--shadow-color)/0.15,0_8px_16px_-4px_var(--shadow-color)/0.1] active:shadow-[0_1px_2px_var(--shadow-color)/0.08] focus-visible:ring-success/30",
        warning:
          "bg-warning text-warning-foreground tracking-tight shadow-[0_2px_4px_-1px_var(--shadow-color)/0.12,0_4px_8px_-2px_var(--shadow-color)/0.08] hover:bg-warning/95 hover:shadow-[0_4px_12px_-2px_var(--shadow-color)/0.15,0_8px_16px_-4px_var(--shadow-color)/0.1] active:shadow-[0_1px_2px_var(--shadow-color)/0.08] focus-visible:ring-warning/40",
        info:
          "bg-info text-info-foreground tracking-tight shadow-[0_1px_0_0_theme(colors.info.foreground/0.08)_inset,0_2px_4px_-1px_var(--shadow-color)/0.12,0_4px_8px_-2px_var(--shadow-color)/0.08] hover:bg-info/95 hover:shadow-[0_1px_0_0_theme(colors.info.foreground/0.06)_inset,0_4px_12px_-2px_var(--shadow-color)/0.15,0_8px_16px_-4px_var(--shadow-color)/0.1] active:shadow-[0_1px_2px_var(--shadow-color)/0.08] focus-visible:ring-info/30",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-xl px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
