import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface PageHeaderProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        {title ? <h2 className={typography.pageTitle}>{title}</h2> : null}
        {description ? (
          <p className={typography.pageDescription}>{description}</p>
        ) : null}
        {children}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
