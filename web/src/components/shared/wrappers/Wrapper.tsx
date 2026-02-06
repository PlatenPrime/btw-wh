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
        "relative overflow-hidden rounded-xl border border-border/60 p-3 backdrop-blur-md dark:border-border/50",
        // базовый цветной градиент, чтобы фон не был просто белым
        "bg-gradient-to-br from-primary/10 via-background/95 to-sky-500/10 dark:from-primary/18 dark:via-background/85 dark:to-sky-400/16",
        // органические пятна света/цвета через псевдо-элементы
        "before:pointer-events-none before:absolute before:-top-32 before:-left-16 before:h-64 before:w-64 before:rounded-full",
        "before:bg-[radial-gradient(circle_at_10%_0%,hsl(var(--primary)/0.35),transparent_60%)] before:opacity-85 before:blur-3xl before:mix-blend-normal before:animate-blob-slow",
        "after:pointer-events-none after:absolute after:-bottom-40 after:-right-20 after:h-72 after:w-72 after:rounded-full",
        "after:bg-[radial-gradient(circle_at_100%_100%,hsl(var(--accent)/0.30),transparent_60%)] after:opacity-80 after:blur-3xl after:mix-blend-normal after:animate-blob-slow",
        // лёгкая глубокая тень для объёма
        "shadow-[0_14px_38px_-18px_rgba(15,23,42,0.45)] dark:shadow-[0_16px_42px_-20px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
