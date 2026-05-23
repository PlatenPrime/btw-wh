import { cn } from "@/lib/utils";

interface PageSectionProps extends React.ComponentProps<"section"> {
  children: React.ReactNode;
}

export function PageSection({ children, className, ...props }: PageSectionProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </section>
  );
}
