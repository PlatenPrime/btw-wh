import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Input } from "@/components/ui/input";
import { useContainerInfiniteScroll } from "@/hooks/useContainerInfiniteScroll";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { ReportEntitySearchSkeleton } from "./ReportEntitySearchSkeleton";

export interface ReportEntityOption {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

interface ReportEntitySearchViewProps {
  inputId: string;
  label: string;
  placeholder: string;
  search: string;
  onSearchChange: (value: string) => void;
  options: ReportEntityOption[];
  selectedId: string;
  selectedTitle: string;
  selectedImageUrl?: string;
  onSelect: (option: ReportEntityOption) => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  hasMoreOnServer: boolean;
  disabled?: boolean;
}

export function ReportEntitySearchView({
  inputId,
  label,
  placeholder,
  search,
  onSearchChange,
  options,
  selectedId,
  selectedTitle,
  selectedImageUrl,
  onSelect,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  hasMoreOnServer,
  disabled = false,
}: ReportEntitySearchViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useContainerInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    fetchNextPage,
    containerRef: scrollContainerRef as React.RefObject<HTMLElement>,
  });

  return (
    <div className="grid gap-2">
      {label ? (
        <label htmlFor={inputId} className={typography.formLabel}>
          {label}
        </label>
      ) : null}
      <Input
        id={inputId}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {selectedTitle ? (
        <div className="flex items-center gap-2">
          <span className={typography.pageDescription}>Обрано:</span>
          <EntityLabel
            imageUrl={selectedImageUrl}
            title={selectedTitle}
            fallbackLabel={selectedTitle}
            imageSize="xs"
          />
        </div>
      ) : null}
      {isLoading ? (
        <ReportEntitySearchSkeleton />
      ) : (
        <div
          ref={scrollContainerRef}
          className="bg-card grid h-[220px] gap-2 overflow-auto rounded-md border p-2"
        >
          {options.length === 0 ? (
            <p className={typography.pageDescription}>Нічого не знайдено</p>
          ) : (
            options.map((option) => {
              const isSelected = option.id === selectedId;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelect(option)}
                  className={cn(
                    "grid gap-1 rounded-md p-2 text-left",
                    isSelected ? "bg-accent" : "hover:bg-muted",
                  )}
                >
                  <EntityLabel
                    imageUrl={option.imageUrl}
                    title={option.title}
                    fallbackLabel={option.title}
                    imageSize="xs"
                  />
                  {option.subtitle ? (
                    <span className={typography.pageDescription}>
                      {option.subtitle}
                    </span>
                  ) : null}
                </button>
              );
            })
          )}
          <div ref={bottomRef} />
          {isFetchingNextPage ? (
            <p className={typography.pageDescription}>Завантаження...</p>
          ) : null}
          {hasMoreOnServer ? (
            <p className={typography.pageDescription}>
              Уточніть пошук, щоб побачити решту.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
