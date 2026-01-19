import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({ children, className }: WrapperProps) {
  return (

      <div className={cn("bg-card/50 dark:bg-card/50 rounded-xl p-2 shadow-2xl shadow-red-500 dark:shadow-red-300 border border-black/10 dark:border-white/5 ", className)}>{children}</div>

  );
}
