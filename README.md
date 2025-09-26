# Money Lens 💰

A modern web application for managing and analyzing financial transaction data from CSV files. Upload your bank statements, categorize transactions, create automated rules, and gain insights into your spending patterns.

![Money Lens Dashboard](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-blue?logo=mui)

## ✨ Features

- **📁 CSV File Upload** - Drag and drop CSV files containing transaction data
- **🏷️ Smart Categorization** - Organize transactions into custom groups with color coding
- **🤖 Automated Rules** - Create rules to automatically categorize transactions based on descriptions
- **📊 Rich Analytics** - Comprehensive charts and visualizations for spending analysis
- **💾 Persistent Storage** - Data is saved locally in your browser
- **🎨 Modern UI** - Clean, responsive interface built with Material-UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd money-lens-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## 📖 How to Use

### 1. Upload CSV Files
- Navigate to the **Upload** tab
- Drag and drop your CSV files or click to select
- Supported format: CSV files with date, amount, and description columns
- Files are processed automatically and transactions are extracted

### 2. Manage Transaction Groups
- Create custom categories (Food, Transport, Entertainment, etc.)
- Each group has a unique color for easy identification
- Pre-configured groups are available out of the box

### 3. Set Up Automated Rules
- Create rules to automatically categorize transactions
- Rules match against transaction descriptions using keywords
- New transactions are automatically categorized when uploaded

### 4. View Analytics
- **Summary Cards** - Total spending, transaction counts, and averages
- **Spending Pie Chart** - Breakdown by category
- **Monthly Trends** - Spending patterns over time
- **Top Categories** - Highest spending categories
- **Transaction Frequency** - Transaction patterns
- **Top Merchants** - Most frequent transaction sources

### 5. Manage Transactions
- View all transactions in a searchable table
- Filter by groups, date ranges, and amounts
- Manually assign or remove group categories
- Bulk operations for multiple transactions

## 🏗️ Tech Stack

- **Frontend Framework**: Next.js 15 with App Router and Turbopack
- **UI Library**: React 19 with TypeScript
- **Component Library**: Material-UI (MUI) v7
- **State Management**: Redux Toolkit with persistence
- **Charts**: Recharts for data visualization
- **File Upload**: React Dropzone
- **Styling**: Emotion (CSS-in-JS) + Tailwind CSS v4

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── analytics/          # Chart and analytics components
│   ├── groups/            # Group management components
│   ├── rules/             # Rule creation components
│   └── transactions/      # Transaction management components
├── store/
│   ├── slices/            # Redux slices for state management
│   ├── middleware/        # Custom Redux middleware
│   └── storage/           # Persistence configuration
├── services/              # Utility services
├── theme/                 # Material-UI theme configuration
└── utils/                 # Utility functions
```

## 🔧 Key Components

### State Management
- **filesSlice** - Manages uploaded CSV files and processing status
- **transactionsSlice** - Handles parsed transaction data and group assignments
- **groupsSlice** - Manages transaction categories with colors
- **rulesSlice** - Handles automatic categorization rules

### Data Flow
1. CSV files are uploaded and processed
2. Transactions are parsed and stored
3. Rules engine automatically categorizes transactions
4. Analytics components visualize the data
5. All state is persisted to localStorage

## 🎯 Features Breakdown

### Transaction Management
- Parse CSV files with flexible column detection
- Support for multiple currencies
- Automatic amount and date parsing
- File-based transaction tracking

### Categorization System
- Create unlimited custom groups
- Color-coded categories for visual organization
- Bulk assignment and management
- Group-based filtering and analytics

### Rules Engine
- Pattern-based automatic categorization
- Keyword matching in transaction descriptions
- Rule priority and conflict resolution
- Retroactive rule application

### Analytics Dashboard
- Real-time spending insights
- Multiple chart types (pie, bar, line, area)
- Date range filtering
- Export capabilities
- Responsive design for all screen sizes

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. If you have access and want to contribute, please follow the existing code patterns and ensure all changes are properly tested.