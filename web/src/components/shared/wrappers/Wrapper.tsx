import { cn } from "@/lib/utils";

interface WrapperProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({ children, className, ...rest }: WrapperProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-xl border border-border/50 p-2 backdrop-blur-sm dark:border-border/40",
        "bg-gradient-to-br from-sky-500/5 via-transparent to-primary/5 dark:from-sky-400/5 dark:via-transparent dark:to-primary/5",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(14,165,233,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(56,189,248,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
