# Row Detail Components

A comprehensive set of components for displaying detailed information about a single warehouse row.

## Features

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Loading States**: Skeleton components for better UX during data fetching
- **Error Handling**: Graceful error states with user-friendly messages
- **Search Functionality**: Built-in search for pallets within a row
- **Statistics Display**: Visual representation of row utilization and metrics
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **TypeScript**: Fully typed with proper interfaces

## Component Structure

```
src/modules/rows/components/row-detail/
├── index.tsx              # Main row detail component
├── container.tsx          # Container with URL parameter handling
├── view.tsx              # Main view component
├── skeleton.tsx          # Loading skeleton
├── breadcrumb.tsx        # Navigation breadcrumb
├── pallets-list.tsx      # Pallets display with search
├── row-stats.tsx         # Row statistics and metrics
└── README.md             # This documentation
```

## Usage

### Basic Implementation

```tsx
import { RowDetailContainer } from "@/modules/rows/components/row-detail/container";

export function RowPage() {
  return (
    <SidebarInsetLayout headerText="Ряд">
      <main className="p-4">
        <RowDetailContainer />
      </main>
    </SidebarInsetLayout>
  );
}
```

### Direct Component Usage

```tsx
import { RowDetail } from "@/modules/rows/components/row-detail";

export function CustomRowDetail() {
  const rowTitle = "some-row-title";

  return <RowDetail rowTitle={rowTitle} />;
}
```

## Components in Detail

### RowDetail (index.tsx)

Main component that handles data fetching, loading states, and error handling.

**Props:**

- `rowTitle?: string` - The title of the row to display

**Features:**

- Automatic data fetching using React Query
- Loading skeleton display
- Error state handling
- Empty state handling

### View (view.tsx)

Main view component that displays the row information in a structured layout.

**Props:**

- `row: RowDto` - The row data to display

**Features:**

- Responsive grid layout
- Header with navigation and actions
- Information cards
- Statistics display
- Pallets list

### PalletsList (pallets-list.tsx)

Component for displaying and searching through pallets in a row.

**Props:**

- `row: RowDto` - The row data containing pallets

**Features:**

- Search functionality
- Grid layout for pallets
- Empty state handling
- Pallet numbering
- Responsive design

### RowStats (row-stats.tsx)

Component for displaying row statistics and metrics.

**Props:**

- `row: RowDto` - The row data for calculations

**Features:**

- Utilization rate visualization
- Pallet count display
- Last updated information
- Status indicators

### Breadcrumb (breadcrumb.tsx)

Navigation breadcrumb component.

**Props:**

- `rowTitle: string` - The title of the current row

**Features:**

- Navigation back to rows list
- Current row indication
- Consistent styling

## Data Structure

```typescript
interface RowDto {
  _id: string;
  title: string;
  pallets: string[];
}
```

## API Integration

The components use the following API functions:

- `getRowByTitle(rowTitle: string)` - Fetches a single row by title
- `useRowByTitleQuery(rowTitle?: string)` - React Query hook for row data by title

## Styling

The components use Tailwind CSS with a consistent design system:

- **Colors**: Follows the theme's color palette
- **Spacing**: Consistent gap and padding values
- **Typography**: Proper text hierarchy and sizing
- **Animations**: Smooth transitions and hover effects
- **Dark Mode**: Full dark mode support

## Performance Optimizations

- **Lazy Loading**: Skeleton components during data fetching
- **Optimized Re-renders**: Proper dependency arrays in hooks
- **Search Debouncing**: Efficient search functionality
- **Responsive Images**: Optimized for different screen sizes

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets WCAG guidelines

## Future Enhancements

- [ ] Pallet editing functionality
- [ ] Bulk pallet operations
- [ ] Export functionality
- [ ] Real-time updates via WebSocket
- [ ] Advanced filtering options
- [ ] Pallet history tracking
- [ ] Capacity planning tools
