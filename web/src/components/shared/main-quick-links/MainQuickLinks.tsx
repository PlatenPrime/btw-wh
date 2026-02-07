import { getIcon } from "@/components/layout/sidebar/data/app-sidebar-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { quickLinksData } from "./quick-links-data";

/**
 * Сітка карток-посилань «Швидкий доступ» на ключові розділи додатку.
 */
export function MainQuickLinks() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-semibold md:text-2xl">
        Швидкий доступ
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinksData.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className="focus-visible:ring-ring block rounded-xl transition-all hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Card
              className={cn(
                "h-full transition-all duration-200",
                "hover:border-primary/30 hover:shadow-lg",
              )}
            >
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-start gap-2">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg [&_svg]:h-5 [&_svg]:w-5">
                    {getIcon(item.iconName)}
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>

                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
