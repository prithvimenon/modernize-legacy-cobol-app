export interface Transaction {
  id: number;
  type: "CREDIT" | "DEBIT";
  amount: number;
  previousBalance: number;
  newBalance: number;
  timestamp: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface OperationResult {
  success: boolean;
  error?: string;
  previousBalance?: number;
  amount?: number;
  newBalance?: number;
  currentBalance?: number;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}
