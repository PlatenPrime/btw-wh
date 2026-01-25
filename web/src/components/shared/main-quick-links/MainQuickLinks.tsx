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
      <h2 className="text-xl font-semibold md:text-2xl text-center">Швидкий доступ</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinksData.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            className="block transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
          >
            <Card
              className={cn(
                "h-full border bg-card/80 shadow-sm transition-all duration-200",
                "hover:border-primary/30 hover:shadow-lg dark:bg-card/60",
              )}
            >
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-start gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
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
