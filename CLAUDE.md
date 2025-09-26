# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture Overview

This is a Next.js 15 React application for managing and analyzing financial transaction data from CSV files. The application follows a component-based architecture with Redux for state management.

### Key Technologies
- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components and theming
- **Redux Toolkit** with persistence middleware for state management
- **Recharts** for data visualization
- **React Dropzone** for file upload functionality

### State Management Structure

The Redux store is organized into four main slices:

1. **filesSlice** (`src/store/slices/fileSlice.ts`) - Manages uploaded CSV files and processing status
2. **transactionsSlice** (`src/store/slices/transactionsSlice.ts`) - Manages parsed transaction data with group assignments
3. **groupsSlice** (`src/store/slices/groupsSlice.ts`) - Manages transaction categorization groups with colors
4. **rulesSlice** (`src/store/slices/rulesSlice.ts`) - Manages automatic categorization rules

The store uses custom persistence middleware that saves state to localStorage with selective serialization based on configuration in `src/store/storage/config.ts`.

### Core Data Flow

1. **File Upload**: Users upload CSV files via drag-and-drop interface in `UploadFilesTabs`
2. **Transaction Parsing**: CSV files are processed and converted to `ITransaction` objects with parsed amounts and currencies
3. **Group Assignment**: Transactions can be manually assigned to groups or automatically categorized using rules
4. **Analytics**: Processed transactions are visualized through various charts and summary components

### Transaction Data Model

```typescript
interface ITransaction {
  id: string;
  date: string;
  amount: string; // Original string for display
  amountNumeric: number; // Parsed nx`umeric value
  currency: string; // Extracted currency (e.g., "EGP", "USD")
  description: string;
  fileName: string;
  groupIds: string[]; // Array of assigned group IDs
}
```

### Component Organization

- `src/components/analytics/` - Chart components for transaction visualization
- `src/components/transactions/` - Transaction management and filtering components
- `src/components/groups/` - Group creation and management
- `src/components/rules/` - Rule creation for automatic categorization
- `src/services/` - Utility services (e.g., PromptDialogService)

### Rules System

The application includes an automatic categorization system where users can create rules that match transaction descriptions to automatically assign groups. Rules are applied when transactions are added and can be reapplied across all transactions.

### Persistence

State persistence is handled through custom middleware that:
- Saves specific slices to localStorage on state changes
- Loads persisted state on application initialization
- Excludes loading states and other transient data from persistence