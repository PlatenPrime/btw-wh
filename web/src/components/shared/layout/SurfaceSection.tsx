import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const surfaceSectionVariants = cva(
  "relative overflow-hidden rounded-xl border p-3",
  {
    variants: {
      variant: {
        default:
          "glass-section border-border/60 shadow-elevation-2",
        subtle:
          "glass-section border-border/50 shadow-elevation-1",
        none: "border-transparent bg-transparent p-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SurfaceSectionProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof surfaceSectionVariants> {
  children: React.ReactNode;
  /** Override shell (border, padding) without affecting content layout */
  surfaceClassName?: string;
}

export function SurfaceSection({
  children,
  className,
  surfaceClassName,
  variant,
  ...rest
}: SurfaceSectionProps) {
  return (
    <div
      {...rest}
      className={cn(surfaceSectionVariants({ variant }), surfaceClassName)}
    >
      {variant !== "none" ? (
        <>
          <div
            className="pointer-events-none absolute -top-32 -left-16 h-64 w-64 rounded-full opacity-80 blur-3xl motion-reduce:opacity-40"
            style={{ background: "var(--gradient-primary-glow)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-20 h-72 w-72 rounded-full opacity-70 blur-3xl motion-reduce:opacity-30"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, color-mix(in oklch, var(--accent) 30%, transparent) 0%, transparent 60%)",
            }}
            aria-hidden
          />
        </>
      ) : null}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
