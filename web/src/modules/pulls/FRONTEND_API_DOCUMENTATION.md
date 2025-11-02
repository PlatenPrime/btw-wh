# Frontend API Documentation - Pulls Module

## Overview

The Pulls module provides an automated system for calculating and managing warehouse extraction tasks. It dynamically calculates optimal routes for warehouse workers (solvers) by grouping product positions by pallets and sorting them by sectors for efficient processing.

**Base URL:** `/api/pulls`  
**Authentication:** Bearer Token required  
**Authorization:** ADMIN or PRIME role required for all operations

### Key Concepts

- **Pull**: A virtual data structure representing a set of positions on a specific pallet that need to be processed (goods extracted) to fulfill one or more asks (requests)
- **Dynamic Calculation**: Pulls are not stored in the database but calculated in real-time based on all active asks with status "new"
- **Automatic Optimization**: Positions are grouped by pallets and sorted by sectors to minimize warehouse movement
- **Auto-completion**: When an ask is fully processed, it automatically transitions to "completed" status and sends notifications

### Business Logic Flow

1. System retrieves all asks with status `"new"`
2. Asks are grouped by `artikul` (product code)
3. For each artikul, available positions are found (from `"pogrebi"` warehouse with `quant > 0`)
4. Positions are sorted by sector (ascending) for optimal route
5. Asks are distributed to positions using greedy algorithm:
   - For asks with specified quantity: sequential distribution until fulfilled
   - For asks without quantity: assigned to first position (solver decides quantity)
6. Positions are grouped by pallet
7. Pull objects are created with metadata and sorted by sector

---

## Authentication and Authorization

### JWT Token Format

All requests must include a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### Required Roles

- **ADMIN**: Can access all pulls endpoints
- **PRIME**: Can access all pulls endpoints
- **USER**: No access (403 Forbidden)

### Example Request Headers

```javascript
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
};
```

### Authentication Errors

**401 - Unauthorized**

```json
{
  "message": "Не авторизовано: отсутствует токен авторизации",
  "code": "NO_TOKEN"
}
```

**401 - Invalid Token Format**

```json
{
  "message": "Не авторизовано: неверный формат токена",
  "code": "INVALID_TOKEN_FORMAT"
}
```

**401 - Token Expired**

```json
{
  "message": "Не авторизовано: токен истек",
  "code": "TOKEN_EXPIRED"
}
```

**403 - Insufficient Permissions**

```json
{
  "message": "Недостаточно прав доступа",
  "code": "INSUFFICIENT_PERMISSIONS"
}
```

### Recommended Authentication Setup

```javascript
// Using Axios with interceptors
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

## Data Models

### IPull Interface

Represents a virtual pallet with all positions that need to be processed.

```typescript
interface IPull {
  /** Unique identifier of the pallet (MongoDB ObjectId as string) */
  palletId: string;
  /** Title/name of the pallet (e.g., "Pallet-42-5-2") */
  palletTitle: string;
  /** Sector number for sorting priority (0 if sector is null/undefined) */
  sector: number;
  /** Title/name of the row containing this pallet */
  rowTitle: string;
  /** Array of positions to be processed on this pallet */
  positions: IPullPosition[];
  /** Total number of unique asks involved in this pull */
  totalAsks: number;
}
```

### IPullPosition Interface

Represents a single position within a pull that needs to be processed.

```typescript
interface IPullPosition {
  /** Unique identifier of the position (MongoDB ObjectId as string) */
  posId: string;
  /** Article number/identifier (product code) */
  artikul: string;
  /** Ukrainian name of the product (optional) */
  nameukr?: string;
  /** Current quantity available on the pallet */
  currentQuant: number;
  /** Requested quantity to be pulled from this position (0 for asks without quant) */
  requestedQuant: number;
  /** ID of the ask that requests this position (MongoDB ObjectId as string) */
  askId: string;
  /** Data of the user who made the ask */
  askerData: AskUserData;
}
```

### AskUserData Interface

User information for the ask creator.

```typescript
type AskUserData = {
  /** User ID (MongoDB ObjectId as string) */
  _id: string;
  /** User's full name */
  fullname: string;
  /** Telegram username (optional) */
  telegram?: string;
  /** User photo URL (optional) */
  photo?: string;
};
```

### IPullsResponse Interface

Response format for getting all pulls.

```typescript
interface IPullsResponse {
  /** Array of calculated pulls, sorted by sector */
  pulls: IPull[];
  /** Total number of pulls */
  totalPulls: number;
  /** Total number of unique asks being processed */
  totalAsks: number;
}
```

### IProcessPullPositionRequest Interface

Request format for processing a pull position.

```typescript
interface IProcessPullPositionRequest {
  /** ID of the ask that requests this position (MongoDB ObjectId string) */
  askId: string;
  /** Actual quantity to be pulled from the position (must be positive) */
  actualQuant: number;
  /** ID of the solver processing this position (MongoDB ObjectId string) */
  solverId: string;
}
```

### Example Data

#### Example IPull

```json
{
  "palletId": "64a1b2c3d4e5f6789012345",
  "palletTitle": "Pallet-42-5-2",
  "sector": 5,
  "rowTitle": "Row-A",
  "positions": [
    {
      "posId": "64a1b2c3d4e5f6789012346",
      "artikul": "ABC123",
      "nameukr": "Товар українською",
      "currentQuant": 50,
      "requestedQuant": 10,
      "askId": "64a1b2c3d4e5f6789012347",
      "askerData": {
        "_id": "64a1b2c3d4e5f6789012348",
        "fullname": "Іван Іванов",
        "telegram": "@ivan_ivanov",
        "photo": "https://example.com/photo.jpg"
      }
    }
  ],
  "totalAsks": 3
}
```

#### Example IPullsResponse

```json
{
  "pulls": [
    {
      "palletId": "64a1b2c3d4e5f6789012345",
      "palletTitle": "Pallet-42-5-2",
      "sector": 5,
      "rowTitle": "Row-A",
      "positions": [...],
      "totalAsks": 3
    },
    {
      "palletId": "64a1b2c3d4e5f6789012349",
      "palletTitle": "Pallet-42-6-1",
      "sector": 6,
      "rowTitle": "Row-A",
      "positions": [...],
      "totalAsks": 2
    }
  ],
  "totalPulls": 2,
  "totalAsks": 5
}
```

---

## API Endpoints

### 1. Get All Pulls

**GET** `/api/pulls`

Calculates and returns all current pulls based on all active asks with status "new". Pulls are sorted by sector (ascending) for optimal processing route.

#### Request

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters:** None (currently, may be extended for filters/pagination in future)

#### Success Response (200)

```json
{
  "success": true,
  "message": "Pulls calculated successfully",
  "data": {
    "pulls": [
      {
        "palletId": "64a1b2c3d4e5f6789012345",
        "palletTitle": "Pallet-42-5-2",
        "sector": 5,
        "rowTitle": "Row-A",
        "positions": [
          {
            "posId": "64a1b2c3d4e5f6789012346",
            "artikul": "ABC123",
            "nameukr": "Товар українською",
            "currentQuant": 50,
            "requestedQuant": 10,
            "askId": "64a1b2c3d4e5f6789012347",
            "askerData": {
              "_id": "64a1b2c3d4e5f6789012348",
              "fullname": "Іван Іванов",
              "telegram": "@ivan_ivanov",
              "photo": "https://example.com/photo.jpg"
            }
          }
        ],
        "totalAsks": 3
      }
    ],
    "totalPulls": 10,
    "totalAsks": 15
  }
}
```

#### Empty Response (200)

If there are no active asks:

```json
{
  "success": true,
  "message": "Pulls calculated successfully",
  "data": {
    "pulls": [],
    "totalPulls": 0,
    "totalAsks": 0
  }
}
```

#### Error Responses

**500 - Internal Server Error**

```json
{
  "success": false,
  "message": "Failed to calculate pulls",
  "error": "Error message details"
}
```

#### Example Usage

```javascript
const response = await fetch("/api/pulls", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const data = await response.json();

if (data.success) {
  console.log(`Found ${data.data.totalPulls} pulls`);
  console.log(`Processing ${data.data.totalAsks} asks`);
  data.data.pulls.forEach((pull) => {
    console.log(
      `Pallet ${pull.palletTitle} has ${pull.positions.length} positions`
    );
  });
}
```

---

### 2. Get Pull by Pallet ID

**GET** `/api/pulls/:palletId`

Calculates and returns pull for a specific pallet. Useful for focusing on a single pallet during processing.

#### Request

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**

- `palletId` (string, required) - MongoDB ObjectId of the pallet

#### Validation Rules

- `palletId` must be a valid MongoDB ObjectId format (24 hex characters)

#### Success Response (200) - Pull Found

```json
{
  "success": true,
  "exists": true,
  "message": "Pull retrieved successfully",
  "data": {
    "palletId": "64a1b2c3d4e5f6789012345",
    "palletTitle": "Pallet-42-5-2",
    "sector": 5,
    "rowTitle": "Row-A",
    "positions": [
      {
        "posId": "64a1b2c3d4e5f6789012346",
        "artikul": "ABC123",
        "nameukr": "Товар українською",
        "currentQuant": 50,
        "requestedQuant": 10,
        "askId": "64a1b2c3d4e5f6789012347",
        "askerData": {
          "_id": "64a1b2c3d4e5f6789012348",
          "fullname": "Іван Іванов",
          "telegram": "@ivan_ivanov",
          "photo": "https://example.com/photo.jpg"
        }
      }
    ],
    "totalAsks": 3
  }
}
```

#### Success Response (200) - Pull Not Found

```json
{
  "success": true,
  "exists": false,
  "message": "Pull not found for the specified pallet",
  "data": null
}
```

**Note:** This is not an error - it means there are no active asks that require processing on this pallet. The pallet exists but doesn't have any pending work.

#### Error Responses

**400 - Bad Request (Invalid palletId format)**

```json
{
  "success": false,
  "message": "Invalid pallet ID format"
}
```

**500 - Internal Server Error**

```json
{
  "success": false,
  "message": "Failed to calculate pull for pallet",
  "error": "Error message details"
}
```

#### Example Usage

```javascript
const palletId = "64a1b2c3d4e5f6789012345";

const response = await fetch(`/api/pulls/${palletId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const data = await response.json();

if (data.success && data.exists) {
  console.log(
    `Pallet ${data.data.palletTitle} has ${data.data.positions.length} positions to process`
  );
  console.log(`Involves ${data.data.totalAsks} unique asks`);
} else if (data.success && !data.exists) {
  console.log("No pending work on this pallet");
}
```

---

### 3. Process Pull Position

**PATCH** `/api/pulls/:palletId/positions/:posId`

Processes a pull position by removing goods from the position and updating the associated ask. This is the main action that warehouse workers perform.

#### Business Logic

When processing a position:

1. **Validation**: Checks that position, ask, and solver exist and are valid
2. **Quantity Check**: Verifies that `actualQuant` doesn't exceed available quantity (with race condition protection)
3. **Update Position**: Decreases position `quant` by `actualQuant`
4. **Add Action**: Adds a record to ask's `actions` array with extraction information
5. **Check Completion**: Calculates total processed quantity from all actions
6. **Auto-complete Ask**: If ask is fully processed (`processedQuant >= requestedQuant`), automatically:
   - Sets ask status to `"completed"`
   - Sets ask `solver` field
   - Sets ask `completedAt` timestamp
7. **Send Notification**: If ask completed, sends Telegram notification to ask creator (outside transaction)

All operations (steps 1-6) are performed within a MongoDB transaction to ensure data consistency.

#### Request

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**

- `palletId` (string, required) - MongoDB ObjectId of the pallet
- `posId` (string, required) - MongoDB ObjectId of the position

**Request Body:**

```typescript
{
  askId: string; // MongoDB ObjectId string, required
  actualQuant: number; // Positive number, required, > 0
  solverId: string; // MongoDB ObjectId string, required
}
```

#### Validation Rules

**Path Parameters:**

- `palletId` must be a valid MongoDB ObjectId format
- `posId` must be a valid MongoDB ObjectId format

**Request Body:**

- `askId`: Required, must be valid MongoDB ObjectId format
- `actualQuant`: Required, must be a positive number (greater than 0)
- `solverId`: Required, must be valid MongoDB ObjectId format

**Business Validations:**

- Position must exist
- Position must belong to the specified pallet
- Ask must exist and have status `"new"`
- Ask `artikul` must match position `artikul`
- `actualQuant` must not exceed `position.quant` (current available quantity)
- Solver user must exist

#### Success Response (200)

```json
{
  "success": true,
  "message": "Position processed successfully",
  "data": {
    "positionId": "64a1b2c3d4e5f6789012346",
    "palletId": "64a1b2c3d4e5f6789012345",
    "actualQuant": 5,
    "remainingQuant": 45,
    "askProgress": 15,
    "askFullyProcessed": false,
    "askRequestedQuant": 20,
    "remainingAsksInPull": 2,
    "solverName": "Петро Петренко"
  }
}
```

**Response Fields Explained:**

- `positionId`: ID of the processed position
- `palletId`: ID of the pallet containing the position
- `actualQuant`: Quantity that was actually extracted
- `remainingQuant`: Remaining quantity on the position after extraction (0 if empty)
- `askProgress`: Total quantity processed for this ask so far (sum of all actualQuant from actions)
- `askFullyProcessed`: Boolean indicating if the ask is now fully completed
- `askRequestedQuant`: Original requested quantity from the ask (null if ask had no quant specified)
- `remainingAsksInPull`: Number of unique asks still remaining in this pull (excluding current ask if completed)
- `solverName`: Full name of the worker who processed this position

#### Error Responses

**400 - Bad Request (Validation Error)**

```json
{
  "success": false,
  "message": "Invalid pallet ID or position ID format"
}
```

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["askId"],
      "message": "Expected string, received number"
    },
    {
      "code": "too_small",
      "minimum": 1,
      "type": "number",
      "inclusive": true,
      "path": ["actualQuant"],
      "message": "Actual quantity must be greater than 0"
    }
  ]
}
```

**404 - Not Found**

```json
{
  "success": false,
  "message": "Position not found"
}
```

```json
{
  "success": false,
  "message": "Position does not belong to the specified pallet"
}
```

```json
{
  "success": false,
  "message": "Ask not found"
}
```

```json
{
  "success": false,
  "message": "Solver user not found"
}
```

```json
{
  "success": false,
  "message": "Ask is no longer active"
}
```

```json
{
  "success": false,
  "message": "Ask artikul does not match position artikul"
}
```

**422 - Unprocessable Entity (Quantity Error)**

```json
{
  "success": false,
  "message": "Неможливо зняти більше товару, ніж є на позиції"
}
```

This error occurs when `actualQuant > position.quant`. The system includes race condition protection by re-reading the position before processing.

**500 - Internal Server Error**

```json
{
  "success": false,
  "message": "Failed to process position",
  "error": "Internal server error"
}
```

#### Example Usage

```javascript
const processPosition = async (
  palletId,
  posId,
  askId,
  actualQuant,
  solverId
) => {
  try {
    const response = await fetch(`/api/pulls/${palletId}/positions/${posId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        askId,
        actualQuant,
        solverId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log(`Processed ${data.data.actualQuant} items`);
      console.log(`Remaining on position: ${data.data.remainingQuant}`);
      console.log(
        `Ask progress: ${data.data.askProgress}/${data.data.askRequestedQuant}`
      );

      if (data.data.askFullyProcessed) {
        console.log("Ask completed!");
      }

      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error processing position:", error);
    throw error;
  }
};

// Usage
await processPosition(
  "64a1b2c3d4e5f6789012345",
  "64a1b2c3d4e5f6789012346",
  "64a1b2c3d4e5f6789012347",
  5,
  "64a1b2c3d4e5f6789012349"
);
```

---

## Validation and Error Handling

### Validation Rules Summary

#### GET /api/pulls

- No validation required (no parameters)

#### GET /api/pulls/:palletId

- `palletId`: Must be valid MongoDB ObjectId (24 hex characters)

#### PATCH /api/pulls/:palletId/positions/:posId

- `palletId`: Must be valid MongoDB ObjectId
- `posId`: Must be valid MongoDB ObjectId
- `askId`: Must be valid MongoDB ObjectId
- `actualQuant`: Must be positive number (> 0)
- `solverId`: Must be valid MongoDB ObjectId

### Zod Schema Validation

The backend uses Zod schemas for validation. The schemas check:

- Type validation (string, number)
- Format validation (ObjectId format)
- Value validation (positive numbers)

When validation fails, the response includes detailed error information in the `errors` array.

### HTTP Status Codes

| Code | Description           | When Used                                    |
| ---- | --------------------- | -------------------------------------------- |
| 200  | Success               | Successful GET requests, successful PATCH    |
| 400  | Bad Request           | Validation errors, invalid ObjectId formats  |
| 401  | Unauthorized          | Missing or invalid authentication token      |
| 403  | Forbidden             | Insufficient role permissions                |
| 404  | Not Found             | Resource not found (position, ask, user)     |
| 422  | Unprocessable Entity  | Business logic violation (quantity exceeded) |
| 500  | Internal Server Error | Server-side errors                           |

### Error Response Format

All error responses follow this structure:

```typescript
{
  success: false;
  message: string;        // Human-readable error message
  error?: string;         // Optional: detailed error for 500 responses
  errors?: ZodError[];    // Optional: validation errors for 400 responses
}
```

### Error Handling Best Practices

#### 1. Network Errors

```javascript
try {
  const response = await fetch("/api/pulls", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  const data = await response.json();
  return data;
} catch (error) {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    // Network error
    console.error("Network error - check connection");
    return null;
  }
  throw error;
}
```

#### 2. Validation Errors

```javascript
const handleValidationError = (errors) => {
  const messages = errors.map((err) => {
    const field = err.path.join(".");
    return `${field}: ${err.message}`;
  });

  return messages.join("\n");
};

try {
  // ... request
} catch (error) {
  if (error.errors) {
    const message = handleValidationError(error.errors);
    showToast(message, "error");
  }
}
```

#### 3. Business Logic Errors

```javascript
const handleProcessError = (error) => {
  if (error.message.includes("Неможливо зняти")) {
    return "Cannot take more items than available on position";
  }
  if (error.message.includes("not found")) {
    return "Resource not found. Please refresh and try again.";
  }
  if (error.message.includes("no longer active")) {
    return "This ask is already completed. Please refresh the list.";
  }
  return "An error occurred. Please try again.";
};
```

#### 4. User-Friendly Error Messages

Map technical error messages to user-friendly messages:

```javascript
const ERROR_MESSAGES = {
  "Invalid pallet ID format": "Invalid pallet identifier",
  "Invalid request data": "Please check your input and try again",
  "Position not found": "Position was not found. It may have been removed.",
  "Ask not found": "Request was not found. It may have been completed.",
  "Неможливо зняти більше товару, ніж є на позиції":
    "Cannot take more items than available on this position",
  "Ask is no longer active": "This request has already been completed",
  "Solver user not found": "User not found. Please log in again.",
};
```

---

## TanStack Query Integration

### Setup QueryClient

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### Custom Hooks

#### usePulls Hook

Get all pulls with automatic polling for real-time updates.

```typescript
import { useQuery } from "@tanstack/react-query";

interface UsePullsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export const usePulls = (options: UsePullsOptions = {}) => {
  const token = localStorage.getItem("authToken");

  return useQuery({
    queryKey: ["pulls"],
    queryFn: async () => {
      const response = await fetch("/api/pulls", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch pulls");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch pulls");
      }

      return data.data as IPullsResponse;
    },
    enabled: options.enabled !== false,
    refetchInterval: options.refetchInterval ?? 30000, // Default: 30 seconds
    staleTime: 10000, // Consider data fresh for 10 seconds
  });
};
```

**Usage:**

```typescript
function PullsList() {
  const { data, isLoading, error, isRefetching } = usePulls({
    refetchInterval: 30000, // Poll every 30 seconds
  });

  if (isLoading) return <div>Loading pulls...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isRefetching && <div>Updating...</div>}
      <h2>Pulls ({data?.totalPulls || 0})</h2>
      {data?.pulls.map((pull) => (
        <PullCard key={pull.palletId} pull={pull} />
      ))}
    </div>
  );
}
```

#### usePullByPalletId Hook

Get pull for a specific pallet.

```typescript
import { useQuery } from "@tanstack/react-query";

export const usePullByPalletId = (palletId: string | null) => {
  const token = localStorage.getItem("authToken");

  return useQuery({
    queryKey: ["pulls", palletId],
    queryFn: async () => {
      if (!palletId) return null;

      const response = await fetch(`/api/pulls/${palletId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch pull");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch pull");
      }

      // Return null if pull doesn't exist (exists: false)
      return data.exists ? (data.data as IPull) : null;
    },
    enabled: !!palletId,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });
};
```

**Usage:**

```typescript
function PullDetails({ palletId }: { palletId: string }) {
  const { data: pull, isLoading, error } = usePullByPalletId(palletId);

  if (isLoading) return <div>Loading pull details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pull) return <div>No pending work on this pallet</div>;

  return (
    <div>
      <h2>{pull.palletTitle}</h2>
      <p>
        Sector: {pull.sector}, Row: {pull.rowTitle}
      </p>
      <p>Positions: {pull.positions.length}</p>
      <p>Asks: {pull.totalAsks}</p>
      {pull.positions.map((position) => (
        <PositionCard key={position.posId} position={position} />
      ))}
    </div>
  );
}
```

#### useProcessPullPosition Hook

Process a pull position with optimistic updates and cache invalidation.

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProcessPositionParams {
  palletId: string;
  posId: string;
  askId: string;
  actualQuant: number;
  solverId: string;
}

export const useProcessPullPosition = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  return useMutation({
    mutationFn: async (params: ProcessPositionParams) => {
      const { palletId, posId, askId, actualQuant, solverId } = params;

      const response = await fetch(
        `/api/pulls/${palletId}/positions/${posId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            askId,
            actualQuant,
            solverId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process position");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to process position");
      }

      return data.data;
    },
    onMutate: async (params) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["pulls"] });
      await queryClient.cancelQueries({ queryKey: ["pulls", params.palletId] });

      // Snapshot previous values for rollback
      const previousPulls = queryClient.getQueryData<IPullsResponse>(["pulls"]);
      const previousPull = queryClient.getQueryData<IPull>([
        "pulls",
        params.palletId,
      ]);

      // Optimistically update
      if (previousPull) {
        const updatedPull = {
          ...previousPull,
          positions: previousPull.positions.map((pos) =>
            pos.posId === params.posId
              ? {
                  ...pos,
                  currentQuant: Math.max(
                    0,
                    pos.currentQuant - params.actualQuant
                  ),
                }
              : pos
          ),
        };
        queryClient.setQueryData(["pulls", params.palletId], updatedPull);
      }

      return { previousPulls, previousPull };
    },
    onError: (error, params, context) => {
      // Rollback on error
      if (context?.previousPull) {
        queryClient.setQueryData(
          ["pulls", params.palletId],
          context.previousPull
        );
      }
      if (context?.previousPulls) {
        queryClient.setQueryData(["pulls"], context.previousPulls);
      }
    },
    onSuccess: (data, params) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pulls"] });
      queryClient.invalidateQueries({
        queryKey: ["pulls", params.palletId],
      });
      queryClient.invalidateQueries({ queryKey: ["asks"] });

      // If ask completed, show notification
      if (data.askFullyProcessed) {
        queryClient.invalidateQueries({ queryKey: ["asks"] });
        // You might want to show a toast notification here
      }
    },
  });
};
```

**Usage:**

```typescript
function ProcessPositionButton({
  palletId,
  position,
  solverId,
}: {
  palletId: string;
  position: IPullPosition;
  solverId: string;
}) {
  const processPosition = useProcessPullPosition();
  const [actualQuant, setActualQuant] = useState(position.requestedQuant || 0);

  const handleProcess = async () => {
    try {
      const result = await processPosition.mutateAsync({
        palletId,
        posId: position.posId,
        askId: position.askId,
        actualQuant,
        solverId,
      });

      console.log(`Processed ${result.actualQuant} items`);
      console.log(`Remaining: ${result.remainingQuant}`);

      if (result.askFullyProcessed) {
        alert("Ask completed!");
      }
    } catch (error) {
      console.error("Failed to process:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={actualQuant}
        onChange={(e) => setActualQuant(Number(e.target.value))}
        min="1"
        max={position.currentQuant}
      />
      <button
        onClick={handleProcess}
        disabled={processPosition.isPending || actualQuant <= 0}
      >
        {processPosition.isPending ? "Processing..." : "Process"}
      </button>
      {processPosition.isError && (
        <div className="error">{processPosition.error.message}</div>
      )}
    </div>
  );
}
```

### Query Keys Strategy

Use consistent query keys for efficient cache management:

```typescript
const pullKeys = {
  all: ["pulls"] as const,
  lists: () => [...pullKeys.all, "list"] as const,
  list: (filters: string) => [...pullKeys.lists(), filters] as const,
  details: () => [...pullKeys.all, "detail"] as const,
  detail: (id: string) => [...pullKeys.details(), id] as const,
};
```

---

## Best Practices

### 1. Polling Strategy

**Recommended Polling Intervals:**

- **Active worker mode**: 15-30 seconds (frequent updates during active work)
- **Background monitoring**: 60 seconds (less frequent when not actively working)
- **Manual refresh**: Allow users to manually refresh when needed

```typescript
// Active mode
const { data } = usePulls({ refetchInterval: 30000 });

// Background mode
const { data, refetch } = usePulls({ refetchInterval: 60000 });

// Manual mode
const { data, refetch } = usePulls({ enabled: false });
```

**Considerations:**

- Disable polling when tab is inactive to save resources
- Use `refetchOnWindowFocus: true` to refresh when user returns
- Stop polling when all pulls are processed

### 2. Optimistic Updates

Always use optimistic updates for better UX when processing positions:

```typescript
onMutate: async (params) => {
  // Cancel queries to prevent race conditions
  await queryClient.cancelQueries({ queryKey: ["pulls"] });

  // Get current data
  const previous = queryClient.getQueryData(["pulls", params.palletId]);

  // Optimistically update
  queryClient.setQueryData(["pulls", params.palletId], (old: IPull) => ({
    ...old,
    positions: old.positions.map((p) =>
      p.posId === params.posId
        ? { ...p, currentQuant: p.currentQuant - params.actualQuant }
        : p
    ),
  }));

  // Return context for rollback
  return { previous };
},
onError: (error, params, context) => {
  // Rollback on error
  queryClient.setQueryData(["pulls", params.palletId], context.previous);
},
```

### 3. Cache Invalidation

Invalidate relevant queries after mutations:

```typescript
onSuccess: (data, params) => {
  // Always invalidate pulls lists
  queryClient.invalidateQueries({ queryKey: ["pulls"] });

  // Invalidate specific pull
  queryClient.invalidateQueries({
    queryKey: ["pulls", params.palletId],
  });

  // Invalidate asks if ask was completed
  if (data.askFullyProcessed) {
    queryClient.invalidateQueries({ queryKey: ["asks"] });
  }
},
```

### 4. Handling Concurrent Modifications

The backend includes race condition protection, but the frontend should also handle concurrent scenarios:

```typescript
// Check quantity before processing
const canProcess = position.currentQuant >= actualQuant;

if (!canProcess) {
  alert("Not enough items available. Please refresh and try again.");
  refetch(); // Refresh data
  return;
}

// Process with error handling
try {
  await processPosition.mutateAsync(params);
} catch (error) {
  if (error.message.includes("Неможливо зняти")) {
    // Quantity was changed by another user
    refetch(); // Refresh and show updated data
    alert("Quantity changed. Please check the updated data.");
  }
}
```

### 5. Progress Tracking

Display progress for asks and pulls:

```typescript
function AskProgress({
  askId,
  requestedQuant,
}: {
  askId: string;
  requestedQuant: number | null;
}) {
  // This would need integration with asks API to get current progress
  // For now, show progress from pull position response

  return (
    <div>
      <div>Requested: {requestedQuant ?? "Flexible"}</div>
      <ProgressBar value={currentProgress} max={requestedQuant || 100} />
    </div>
  );
}
```

### 6. Edge Cases Handling

**Empty Pulls:**

```typescript
if (data?.totalPulls === 0) {
  return (
    <div>
      <h2>No pending pulls</h2>
      <p>All asks have been processed or there are no active asks.</p>
    </div>
  );
}
```

**Completed Asks:**

When an ask is completed during processing, update the UI immediately:

```typescript
if (result.askFullyProcessed) {
  // Show completion notification
  toast.success(`Ask completed! ${result.solverName} finished processing.`);

  // Optionally remove completed positions from view
  queryClient.invalidateQueries({ queryKey: ["pulls"] });
}
```

**Position Empty After Processing:**

```typescript
if (result.remainingQuant === 0) {
  // Position is now empty, visually indicate this
  // You might want to hide or gray out this position
}
```

### 7. Error Recovery

Implement retry logic for network errors:

```typescript
const processWithRetry = async (params, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await processPosition.mutateAsync(params);
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));

      // Refresh data before retry
      await queryClient.refetchQueries({ queryKey: ["pulls"] });
    }
  }
};
```

### 8. Performance Optimization

- **Debounce polling** when multiple workers are active
- **Virtual scrolling** for large lists of pulls
- **Memoization** for expensive calculations
- **Lazy loading** for pull details

```typescript
// Memoize sorted pulls
const sortedPulls = useMemo(() => {
  return pulls?.pulls.sort((a, b) => a.sector - b.sector) || [];
}, [pulls]);

// Virtual scrolling for large lists
import { useVirtualizer } from "@tanstack/react-virtual";

const virtualizer = useVirtualizer({
  count: sortedPulls.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 100,
});
```

---

## Workflow: Processing Pulls

### Step-by-Step Process

#### 1. Get List of Pulls

```typescript
function PullsPage() {
  const { data: pullsData, isLoading } = usePulls({
    refetchInterval: 30000, // Update every 30 seconds
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Warehouse Pulls</h1>
      <StatsBar
        totalPulls={pullsData?.totalPulls || 0}
        totalAsks={pullsData?.totalAsks || 0}
      />
      <PullsList pulls={pullsData?.pulls || []} />
    </div>
  );
}
```

#### 2. Select Pallet for Processing

```typescript
function PullsList({ pulls }: { pulls: IPull[] }) {
  const [selectedPalletId, setSelectedPalletId] = useState<string | null>(null);

  return (
    <div className="pulls-container">
      <div className="pulls-list">
        {pulls.map((pull) => (
          <PullCard
            key={pull.palletId}
            pull={pull}
            onClick={() => setSelectedPalletId(pull.palletId)}
            isSelected={selectedPalletId === pull.palletId}
          />
        ))}
      </div>

      {selectedPalletId && <PullDetailsPanel palletId={selectedPalletId} />}
    </div>
  );
}
```

#### 3. Display Positions on Pallet

```typescript
function PullDetailsPanel({ palletId }: { palletId: string }) {
  const { data: pull, isLoading } = usePullByPalletId(palletId);
  const currentUser = useCurrentUser(); // Your auth hook

  if (isLoading) return <LoadingSpinner />;
  if (!pull) return <div>No work on this pallet</div>;

  return (
    <div className="pull-details">
      <h2>{pull.palletTitle}</h2>
      <div className="pull-info">
        <span>Sector: {pull.sector}</span>
        <span>Row: {pull.rowTitle}</span>
        <span>Asks: {pull.totalAsks}</span>
      </div>

      <div className="positions-list">
        {pull.positions.map((position) => (
          <PositionCard
            key={position.posId}
            position={position}
            palletId={palletId}
            solverId={currentUser.id}
          />
        ))}
      </div>
    </div>
  );
}
```

#### 4. Process Positions Sequentially

```typescript
function PositionCard({
  position,
  palletId,
  solverId,
}: {
  position: IPullPosition;
  palletId: string;
  solverId: string;
}) {
  const processPosition = useProcessPullPosition();
  const [quant, setQuant] = useState(position.requestedQuant || 1);

  const handleProcess = async () => {
    if (quant <= 0 || quant > position.currentQuant) {
      alert("Invalid quantity");
      return;
    }

    try {
      const result = await processPosition.mutateAsync({
        palletId,
        posId: position.posId,
        askId: position.askId,
        actualQuant: quant,
        solverId,
      });

      // Show success feedback
      toast.success(
        `Processed ${result.actualQuant} items. ` +
          `${result.remainingQuant} remaining.`
      );

      // Handle ask completion
      if (result.askFullyProcessed) {
        toast.success("Ask completed!");
      }

      // Reset quantity for next position
      setQuant(1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="position-card">
      <div className="position-header">
        <h3>{position.artikul}</h3>
        {position.nameukr && <p>{position.nameukr}</p>}
      </div>

      <div className="position-info">
        <div>Available: {position.currentQuant}</div>
        <div>Requested: {position.requestedQuant || "Flexible"}</div>
        <div>Asker: {position.askerData.fullname}</div>
      </div>

      <div className="position-actions">
        <input
          type="number"
          value={quant}
          onChange={(e) => setQuant(Number(e.target.value))}
          min="1"
          max={position.currentQuant}
          disabled={processPosition.isPending}
        />
        <button
          onClick={handleProcess}
          disabled={processPosition.isPending || quant <= 0}
        >
          {processPosition.isPending ? "Processing..." : "Process"}
        </button>
      </div>

      {processPosition.isError && (
        <div className="error">{processPosition.error.message}</div>
      )}
    </div>
  );
}
```

#### 5. Track Progress

```typescript
function PullProgress({ pull }: { pull: IPull }) {
  const totalPositions = pull.positions.length;
  const processedPositions = pull.positions.filter(
    (p) => p.currentQuant === 0
  ).length;

  return (
    <div className="pull-progress">
      <div className="progress-info">
        <span>
          Positions: {processedPositions}/{totalPositions}
        </span>
        <span>Asks: {pull.totalAsks}</span>
      </div>
      <ProgressBar value={processedPositions} max={totalPositions} />
    </div>
  );
}
```

#### 6. Auto-Update Data

Data automatically updates through TanStack Query invalidation. No manual refresh needed after processing positions.

---

## Example Components

### Complete PullsList Component

```typescript
import { usePulls } from "../hooks/usePulls";
import { PullCard } from "./PullCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

export function PullsList() {
  const { data, isLoading, error, isRefetching } = usePulls({
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="pulls-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pulls-container">
        <ErrorMessage
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!data || data.totalPulls === 0) {
    return (
      <div className="pulls-container">
        <div className="empty-state">
          <h2>No Pending Pulls</h2>
          <p>All asks have been processed or there are no active asks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pulls-container">
      {isRefetching && <div className="refetch-indicator">Updating...</div>}

      <div className="pulls-header">
        <h1>Warehouse Pulls</h1>
        <div className="pulls-stats">
          <span>Total Pulls: {data.totalPulls}</span>
          <span>Total Asks: {data.totalAsks}</span>
        </div>
      </div>

      <div className="pulls-grid">
        {data.pulls.map((pull) => (
          <PullCard key={pull.palletId} pull={pull} />
        ))}
      </div>
    </div>
  );
}
```

### Complete PullDetails Component

```typescript
import { usePullByPalletId } from "../hooks/usePullByPalletId";
import { PositionCard } from "./PositionCard";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface PullDetailsProps {
  palletId: string;
  onClose: () => void;
}

export function PullDetails({ palletId, onClose }: PullDetailsProps) {
  const { data: pull, isLoading, error } = usePullByPalletId(palletId);
  const { user: currentUser } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="pull-details-panel">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pull-details-panel">
        <ErrorMessage message={error.message} />
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  if (!pull) {
    return (
      <div className="pull-details-panel">
        <div className="empty-state">
          <h3>No Pending Work</h3>
          <p>There are no active asks for this pallet.</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="pull-details-panel">
      <div className="pull-details-header">
        <div>
          <h2>{pull.palletTitle}</h2>
          <div className="pull-meta">
            <span>Sector: {pull.sector}</span>
            <span>Row: {pull.rowTitle}</span>
            <span>Asks: {pull.totalAsks}</span>
          </div>
        </div>
        <button onClick={onClose}>×</button>
      </div>

      <div className="positions-container">
        <h3>Positions ({pull.positions.length})</h3>
        {pull.positions.map((position) => (
          <PositionCard
            key={position.posId}
            position={position}
            palletId={palletId}
            solverId={currentUser.id}
          />
        ))}
      </div>
    </div>
  );
}
```

### Complete PositionCard with Processing

```typescript
import { useState } from "react";
import { useProcessPullPosition } from "../hooks/useProcessPullPosition";
import { toast } from "react-toastify";
import { IPullPosition } from "../types";

interface PositionCardProps {
  position: IPullPosition;
  palletId: string;
  solverId: string;
}

export function PositionCard({
  position,
  palletId,
  solverId,
}: PositionCardProps) {
  const processPosition = useProcessPullPosition();
  const [actualQuant, setActualQuant] = useState(
    position.requestedQuant > 0 ? position.requestedQuant : 1
  );

  const handleProcess = async () => {
    if (actualQuant <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    if (actualQuant > position.currentQuant) {
      toast.error(`Cannot take more than available (${position.currentQuant})`);
      return;
    }

    try {
      const result = await processPosition.mutateAsync({
        palletId,
        posId: position.posId,
        askId: position.askId,
        actualQuant,
        solverId,
      });

      toast.success(
        `Processed ${result.actualQuant} items. ` +
          `${result.remainingQuant} remaining.`
      );

      if (result.askFullyProcessed) {
        toast.success(`Ask completed! Total processed: ${result.askProgress}`);
      }

      // Reset quantity for next position
      setActualQuant(1);
    } catch (error: any) {
      const message = error.message || "Failed to process position";

      if (message.includes("Неможливо зняти")) {
        toast.error(
          "Not enough items available. Please refresh and try again."
        );
      } else {
        toast.error(message);
      }
    }
  };

  const isCompleted = position.currentQuant === 0;
  const canProcess = actualQuant > 0 && actualQuant <= position.currentQuant;

  return (
    <div className={`position-card ${isCompleted ? "completed" : ""}`}>
      <div className="position-header">
        <div>
          <h4>{position.artikul}</h4>
          {position.nameukr && <p className="name">{position.nameukr}</p>}
        </div>
        {isCompleted && <span className="badge">Completed</span>}
      </div>

      <div className="position-info">
        <div className="info-row">
          <span>Available:</span>
          <strong>{position.currentQuant}</strong>
        </div>
        <div className="info-row">
          <span>Requested:</span>
          <strong>{position.requestedQuant || "Flexible"}</strong>
        </div>
        <div className="info-row">
          <span>Asker:</span>
          <span>{position.askerData.fullname}</span>
        </div>
      </div>

      {!isCompleted && (
        <div className="position-actions">
          <div className="quantity-input">
            <label>Quantity to take:</label>
            <input
              type="number"
              value={actualQuant}
              onChange={(e) => setActualQuant(Number(e.target.value))}
              min="1"
              max={position.currentQuant}
              disabled={processPosition.isPending}
            />
          </div>
          <button
            onClick={handleProcess}
            disabled={processPosition.isPending || !canProcess}
            className="process-button"
          >
            {processPosition.isPending ? "Processing..." : "Process"}
          </button>
        </div>
      )}

      {processPosition.isError && (
        <div className="error-message">{processPosition.error.message}</div>
      )}
    </div>
  );
}
```

---

## Technical Details

### Polling Frequency Recommendations

| Scenario                 | Interval      | Rationale                                 |
| ------------------------ | ------------- | ----------------------------------------- |
| Active worker            | 15-30 seconds | Frequent updates during active processing |
| Background monitoring    | 60 seconds    | Less frequent when monitoring only        |
| Manual mode              | Disabled      | User-initiated refresh only               |
| After position processed | Immediate     | Use invalidation instead of polling       |

### Data Size and Performance

- **Typical pull size**: 5-50 positions per pallet
- **Typical response size**: 50-500 KB (depending on number of pulls)
- **Calculation time**: < 1 second (usually 200-500ms)
- **Recommendation**: Use pagination if you expect > 100 pulls (currently not implemented but may be added)

### Caching Strategy

```typescript
// Recommended cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000, // 10 seconds - data is fresh
      cacheTime: 300000, // 5 minutes - keep in cache
      refetchOnMount: true, // Always refetch on mount
      refetchOnWindowFocus: true, // Refetch when window regains focus
    },
  },
});
```

### Race Condition Prevention

The backend handles race conditions by:

1. Re-reading position data before processing
2. Using MongoDB transactions
3. Validating quantity within transaction

Frontend should:

1. Show loading state during processing
2. Disable button during mutation
3. Handle 422 errors gracefully
4. Refresh data on quantity errors

```typescript
// Prevent double-processing
const [isProcessing, setIsProcessing] = useState(false);

const handleProcess = async () => {
  if (isProcessing) return;

  setIsProcessing(true);
  try {
    await processPosition.mutateAsync(params);
  } finally {
    setIsProcessing(false);
  }
};
```

### Error Recovery Strategies

1. **Network Errors**: Retry with exponential backoff
2. **Validation Errors**: Show user-friendly messages, allow correction
3. **Business Logic Errors**: Refresh data and show updated state
4. **Concurrent Modification**: Refresh and retry

---

## Troubleshooting

### Common Issues

#### 1. Pulls Not Updating

**Problem**: Pulls list doesn't refresh after processing position.

**Solution**: Ensure cache invalidation is properly configured:

```typescript
onSuccess: (data, params) => {
  queryClient.invalidateQueries({ queryKey: ["pulls"] });
  queryClient.invalidateQueries({ queryKey: ["pulls", params.palletId] });
},
```

#### 2. Quantity Errors

**Problem**: Getting "Cannot take more" errors even though UI shows available quantity.

**Solution**: This indicates a race condition. Refresh data before processing:

```typescript
const { refetch } = usePullByPalletId(palletId);

// Before processing
await refetch();

// Then process with latest data
await processPosition.mutateAsync(params);
```

#### 3. Ask Not Completing

**Problem**: Ask doesn't show as completed after processing all positions.

**Solution**: Check that `askRequestedQuant` is being tracked correctly. For asks without quantity, completion is manual.

#### 4. Empty Pulls List

**Problem**: No pulls shown but there are active asks.

**Solution**:

- Check that asks have status `"new"`
- Verify positions exist with `quant > 0` and `sklad = "pogrebi"`
- Check for errors in browser console
- Verify authentication token is valid

#### 5. Performance Issues

**Problem**: Slow response times or UI freezing.

**Solution**:

- Reduce polling frequency
- Implement virtual scrolling for large lists
- Use memoization for expensive calculations
- Check network tab for large responses

---

## Summary

This documentation provides everything needed to integrate the Pulls module into a frontend application:

✅ **Complete API Reference**: All endpoints with request/response formats  
✅ **TypeScript Types**: All data models and interfaces  
✅ **TanStack Query Integration**: Ready-to-use hooks with best practices  
✅ **Error Handling**: Comprehensive error handling strategies  
✅ **Examples**: Real-world React components  
✅ **Best Practices**: Performance, UX, and reliability recommendations  
✅ **Workflow**: Step-by-step processing guide

The module is designed to be straightforward to integrate while providing powerful features like automatic ask completion, progress tracking, and real-time updates.

For questions or issues, refer to the backend implementation in `src/modules/pulls/` or contact the backend team.
