# Modernized Account Management System

This is the modernized version of the legacy COBOL accounting system, rebuilt with a **React + TypeScript** frontend and **Node.js + Express** backend.

## Architecture

### Original COBOL Structure
| COBOL File | Purpose |
|---|---|
| `main.cob` | CLI menu interface (options 1-4) |
| `operations.cob` | Business logic (credit, debit, view balance) |
| `data.cob` | In-memory balance storage (READ/WRITE) |

### Modernized Structure
| Module | Technology | Maps From |
|---|---|---|
| `server/index.js` | Express REST API | `main.cob` (routing) |
| `server/operations.js` | Business logic | `operations.cob` |
| `server/data.js` | In-memory storage | `data.cob` |
| `client/` | React + TypeScript + Tailwind CSS | New UI layer |

## API Endpoints

| Endpoint | Method | COBOL Equivalent | Description |
|---|---|---|---|
| `/api/balance` | GET | Option 1 (TOTAL) | View current balance |
| `/api/credit` | POST | Option 2 (CREDIT) | Credit account `{ amount }` |
| `/api/debit` | POST | Option 3 (DEBIT) | Debit account `{ amount }` |
| `/api/transactions` | GET | N/A (new feature) | Transaction history |

## Getting Started

### Prerequisites
- Node.js 18+

### Run the Backend
```bash
cd server
npm install
npm start
```
Server starts on http://localhost:4000

### Run the Frontend
```bash
cd client
npm install
npm run dev
```
Frontend starts on http://localhost:5173 (proxies API calls to backend)

### Build for Production
```bash
cd client
npm run build
```

## Business Logic Preserved

All original COBOL business rules are maintained:
- **Initial balance**: $1,000.00 (matching `PIC 9(6)V99 VALUE 1000.00`)
- **Credit**: Adds amount to balance
- **Debit**: Subtracts amount with insufficient funds validation
- **Precision**: 2 decimal places (matching COBOL `V99`)

## Test Plan

See [TESTPLAN.md](../TESTPLAN.md) for the original test cases. All scenarios are covered:
- TC-1.1: View Current Balance
- TC-2.1: Credit Account with Valid Amount
- TC-2.2: Credit Account with Zero Amount
- TC-3.1: Debit Account with Valid Amount
- TC-3.2: Debit Account with Amount Greater Than Balance
- TC-3.3: Debit Account with Zero Amount
