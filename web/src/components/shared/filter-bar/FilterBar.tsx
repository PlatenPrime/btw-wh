import { cn } from "@/lib/utils";

interface FilterBarProps extends React.ComponentProps<"div"> {
  searchSlot?: React.ReactNode;
  filtersSlot?: React.ReactNode;
}

export function FilterBar({
  searchSlot,
  filtersSlot,
  className,
  children,
  ...props
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "glass-panel flex flex-col gap-3 rounded-xl border p-3 shadow-elevation-1 md:flex-row md:items-end md:justify-between",
        className,
      )}
      {...props}
    >
      {searchSlot ? <div className="min-w-0 flex-1">{searchSlot}</div> : null}
      {filtersSlot ? (
        <div className="flex flex-wrap items-center gap-2">{filtersSlot}</div>
      ) : null}
      {children}
    </div>
  );
}
