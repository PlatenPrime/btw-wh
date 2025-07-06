# Rows Module

A comprehensive module for managing warehouse rows with full CRUD operations, built with React Query and modern UI components.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete rows
- ✅ **Real-time Data**: React Query for efficient data fetching and caching
- ✅ **Modern UI**: Built with Shadcn UI components
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Error Handling**: Comprehensive error states and loading indicators
- ✅ **Optimistic Updates**: Immediate UI feedback with background sync

## Data Model

```typescript
interface RowDto {
  _id: string;
  title: string;
  pallets: string[];
  createdAt: string;
  updatedAt: string;
}
```

## API Endpoints

The module supports all RESTful endpoints as documented in `README-ROWS-API.md`:

- `GET /api/rows` - Get all rows
- `GET /api/rows/id/:id` - Get row by ID
- `GET /api/rows/title/:title` - Get row by title
- `POST /api/rows` - Create new row
- `PUT /api/rows/:id` - Update row
- `DELETE /api/rows/:id` - Delete row (with cascading delete)

## Components

### Core Components

#### `Dashboard`

Main dashboard component that displays all rows in a grid layout with create functionality.

```tsx
import { Dashboard } from "@/modules/rows/components";

function RowsPage() {
  return <Dashboard />;
}
```

#### `RowDetail`

Detailed view of a single row with edit and delete actions.

```tsx
import { RowDetail } from "@/modules/rows/components";

function RowDetailPage({ rowTitle }: { rowTitle: string }) {
  return <RowDetail rowTitle={rowTitle} />;
}
```

### Form Components

#### `RowDialog`

Modal dialog for creating or editing rows.

```tsx
import { RowDialog } from "@/modules/rows/components";

function MyComponent() {
  return (
    <RowDialog
      row={existingRow} // Optional: for editing
      trigger={<Button>Create Row</Button>}
      onSuccess={() => console.log("Row saved!")}
    />
  );
}
```

#### `DeleteRowDialog`

Confirmation dialog for deleting rows with cascading delete warning.

```tsx
import { DeleteRowDialog } from "@/modules/rows/components";

function MyComponent({ row }: { row: RowDto }) {
  return (
    <DeleteRowDialog
      row={row}
      trigger={<Button variant="destructive">Delete</Button>}
      onSuccess={() => console.log("Row deleted!")}
    />
  );
}
```

#### `RowForm`

Standalone form component for creating/editing rows.

```tsx
import { RowForm } from "@/modules/rows/components";

function MyComponent() {
  return (
    <RowForm
      row={existingRow} // Optional: for editing
      onSuccess={() => console.log("Row saved!")}
      onCancel={() => console.log("Cancelled")}
    />
  );
}
```

### Grid Components

#### `GridCard`

Individual row card with actions menu.

```tsx
import { GridCard } from "@/modules/rows/components";

function MyComponent({ row }: { row: RowDto }) {
  return (
    <GridCard row={row} onRowUpdated={() => console.log("Row updated!")} />
  );
}
```

## Hooks

### Query Hooks

#### `useRowsQuery`

Fetch all rows with caching and error handling.

```tsx
import { useRowsQuery } from "@/modules/rows/api";

function MyComponent() {
  const { data: rows, isLoading, error, refetch } = useRowsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {rows?.map((row) => (
        <div key={row._id}>{row.title}</div>
      ))}
    </div>
  );
}
```

#### `useRowQuery`

Fetch a single row by ID.

```tsx
import { useRowQuery } from "@/modules/rows/api";

function MyComponent({ rowId }: { rowId: string }) {
  const { data: row, isLoading } = useRowQuery(rowId);

  if (isLoading) return <div>Loading...</div>;

  return <div>{row?.title}</div>;
}
```

#### `useRowByTitleQuery`

Fetch a single row by title.

```tsx
import { useRowByTitleQuery } from "@/modules/rows/api";

function MyComponent({ rowTitle }: { rowTitle: string }) {
  const { data: row, isLoading } = useRowByTitleQuery(rowTitle);

  if (isLoading) return <div>Loading...</div>;

  return <div>{row?.title}</div>;
}
```

### Mutation Hooks

#### `useCreateRowMutation`

Create a new row with optimistic updates.

```tsx
import { useCreateRowMutation } from "@/modules/rows/api";

function MyComponent() {
  const createMutation = useCreateRowMutation();

  const handleCreate = async (title: string) => {
    try {
      await createMutation.mutateAsync({ title });
      console.log("Row created!");
    } catch (error) {
      console.error("Failed to create row:", error);
    }
  };

  return (
    <button
      onClick={() => handleCreate("New Row")}
      disabled={createMutation.isPending}
    >
      {createMutation.isPending ? "Creating..." : "Create Row"}
    </button>
  );
}
```

#### `useUpdateRowMutation`

Update an existing row.

```tsx
import { useUpdateRowMutation } from "@/modules/rows/api";

function MyComponent({ row }: { row: RowDto }) {
  const updateMutation = useUpdateRowMutation();

  const handleUpdate = async (newTitle: string) => {
    try {
      await updateMutation.mutateAsync({
        rowId: row._id,
        data: { title: newTitle },
      });
      console.log("Row updated!");
    } catch (error) {
      console.error("Failed to update row:", error);
    }
  };

  return (
    <button
      onClick={() => handleUpdate("Updated Title")}
      disabled={updateMutation.isPending}
    >
      {updateMutation.isPending ? "Updating..." : "Update Row"}
    </button>
  );
}
```

#### `useDeleteRowMutation`

Delete a row with cascading delete.

```tsx
import { useDeleteRowMutation } from "@/modules/rows/api";

function MyComponent({ row }: { row: RowDto }) {
  const deleteMutation = useDeleteRowMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(row._id);
      console.log("Row deleted!");
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteMutation.isPending}>
      {deleteMutation.isPending ? "Deleting..." : "Delete Row"}
    </button>
  );
}
```

## API Functions

Direct API functions for use outside of React components:

```tsx
import {
  getRows,
  getRowById,
  getRowByTitle,
  createRow,
  updateRow,
  deleteRow,
} from "@/modules/rows/api";

// Example usage
const rows = await getRows();
const row = await getRowById("row-id");
const newRow = await createRow({ title: "New Row" });
const updatedRow = await updateRow("row-id", { title: "Updated Title" });
const result = await deleteRow("row-id");
```

## Types

```tsx
import type {
  RowDto,
  CreateRowDto,
  UpdateRowDto,
  DeleteRowResponse,
} from "@/modules/rows/types/dto";
```

## Error Handling

All components include comprehensive error handling:

- **Loading States**: Skeleton components and loading indicators
- **Error States**: User-friendly error messages
- **Network Errors**: Automatic retry with React Query
- **Validation**: Form validation with proper feedback
- **Optimistic Updates**: Immediate UI feedback with rollback on error

## Styling

The module uses Tailwind CSS with Shadcn UI components for consistent styling:

- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Full dark mode support
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and hover effects

## Best Practices

1. **Type Safety**: All components and functions are fully typed
2. **Performance**: React Query for efficient caching and background updates
3. **User Experience**: Loading states, error handling, and optimistic updates
4. **Maintainability**: Modular component structure with clear separation of concerns
5. **Reusability**: Components are designed to be flexible and reusable

## Integration

The module integrates seamlessly with the existing application:

- **Routing**: Uses React Router for navigation
- **State Management**: React Query for server state
- **UI Framework**: Shadcn UI components
- **Styling**: Tailwind CSS
- **API Client**: Axios-based API client

## Examples

See the individual component files for complete implementation examples and the API documentation for endpoint details.
