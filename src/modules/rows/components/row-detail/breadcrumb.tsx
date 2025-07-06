import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface BreadcrumbProps {
  rowTitle: string;
}

export function Breadcrumb({ rowTitle }: BreadcrumbProps) {
  return (
    <nav className="text-muted-foreground flex items-center space-x-1 text-sm">
      <Link to="/wh/rows" className="hover:text-foreground transition-colors">
        Ряди
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">{rowTitle}</span>
    </nav>
  );
}
