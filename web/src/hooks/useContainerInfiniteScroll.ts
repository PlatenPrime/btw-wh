// hooks/useInfiniteScroll.ts
import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  containerRef: React.RefObject<HTMLElement>; // контейнер, внутри которого прокрутка
  rootMargin?: string;
  threshold?: number;
}

export function useContainerInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
  containerRef,
  rootMargin = "200px",
  threshold = 0,
}: UseInfiniteScrollOptions) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    const el = bottomRef.current;

    if (!root || !el || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root, // скролл-контейнер
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetching, fetchNextPage, containerRef, rootMargin, threshold]);

  return bottomRef;
}


// Использование
// В компоненте:


// import { useRef } from "react";
// import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

// // контейнер прокрутки
// const scrollContainerRef = useRef<HTMLDivElement>(null);

// // хук для бесконечной подгрузки
// const bottomRef = useInfiniteScroll({
//   hasNextPage,
//   isFetching: isFetchingNextPage,
//   fetchNextPage,
//   containerRef: scrollContainerRef,
// });




// JSX разметка:

// <div ref={scrollContainerRef} className="overflow-auto h-[80vh]">
//   {/* Список карточек */}
//   <Grid arts={data} isPending={isPending} isFetching={isFetchingNextPage} />
  
//   {/* Точка триггера */}
//   <div ref={bottomRef} className="h-16" />
// </div>





// Советы
// В tailwind обязательно добавь overflow-auto или overflow-y-scroll и фиксированную высоту контейнеру.

// Если контент не превышает высоту контейнера — IntersectionObserver может не сработать. В таких случаях можно принудительно вызывать fetchNextPage() при монтировании или при отсутствии hasNextPage === false.