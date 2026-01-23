import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={cn(
        "bg-card/5 dark:bg-card/5 rounded-xl border border-black/10 p-2 shadow-xl dark:border-white/5 dark:shadow-md dark:shadow-slate-300/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
