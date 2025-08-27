// hooks/useInfiniteScroll.ts
import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
  threshold?: number;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
  rootMargin = "200px", // заранее догружаем
  threshold = 0,
}: UseInfiniteScrollOptions) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const el = bottomRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetching, fetchNextPage, rootMargin, threshold]);

  return bottomRef;
}
