# Rows Grid Component

A comprehensive grid component for displaying warehouse rows with responsive layout and modern UI.

## Features

- **Responsive Grid Layout**: Mobile-first design with responsive breakpoints
- **Loading States**: Skeleton components for better UX during data fetching
- **Error Handling**: Graceful error states with user-friendly messages
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **TypeScript**: Fully typed with proper interfaces

## Component Structure

```
src/modules/rows/
├── components/
│   ├── dashboard/
│   │   ├── index.tsx          # Main dashboard component
│   │   └── view.tsx           # Dashboard view
│   ├── grid/
│   │   ├── index.tsx          # Grid container component
│   │   ├── view.tsx           # Grid layout component
│   │   └── skeleton.tsx       # Loading skeleton for grid
│   └── grid-card/
│       ├── index.tsx          # Individual row card component
│       └── skeleton.tsx       # Loading skeleton for cards
├── api/
│   ├── getRows.tsx            # API function
│   └── useRowsQuery.tsx       # React Query hook
└── types/
    └── dto.ts                 # TypeScript interfaces
```

## Usage

### Basic Implementation

```tsx
import { Dashboard } from "@/modules/rows/components/dashboard";

export function RowsPage() {
  return (
    <SidebarInsetLayout headerText="Ряди">
      <main className="p-4">
        <Dashboard />
      </main>
    </SidebarInsetLayout>
  );
}
```

### Custom Grid Implementation

```tsx
import { Grid } from "@/modules/rows/components/grid";
import { useRowsQuery } from "@/modules/rows/api/useRowsQuery";

export function CustomRowsGrid() {
  const { data, isLoading, error } = useRowsQuery();

  if (isLoading) return <GridSkeleton />;
  if (error) return <div>Error loading rows</div>;

  return <Grid rows={data} />;
}
```

## Data Structure

```typescript
interface RowDto {
  _id: string;
  title: string;
  pallets: string[];
}
```

## Features in Detail

### Grid Cards

- Display row title with pallet count badge
- Show first 3 pallets with overflow indicator
- Visual indicators for occupied vs empty rows
- Hover effects with smooth transitions
- Navigation to individual row details

### Responsive Design

- **Mobile**: Single column layout
- **Tablet/Desktop**: Auto-fill grid with minimum 280px cards
- **Hover Effects**: Scale and shadow effects on desktop only

## Styling

The component uses Tailwind CSS with a consistent design system:

- **Colors**: Follows the theme's color palette
- **Spacing**: Consistent gap and padding values
- **Typography**: Proper text hierarchy and sizing
- **Animations**: Smooth transitions and hover effects
- **Dark Mode**: Full dark mode support

## Performance Optimizations

- **Lazy Loading**: Skeleton components during data fetching
- **Optimized Re-renders**: Proper dependency arrays in hooks

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets WCAG guidelines

## Future Enhancements

- [ ] Search and filtering functionality
- [ ] Sorting options
- [ ] Pagination for large datasets
- [ ] Advanced filtering (by pallet type, date, etc.)
- [ ] Bulk operations (select multiple rows)
- [ ] Export functionality
- [ ] Real-time updates via WebSocket
- [ ] Drag and drop reordering
