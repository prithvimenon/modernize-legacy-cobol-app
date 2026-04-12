import type { BalanceResponse, OperationResult, TransactionsResponse } from "./types";

const API_BASE = "/api";

export async function fetchBalance(): Promise<BalanceResponse> {
  const res = await fetch(`${API_BASE}/balance`);
  if (!res.ok) throw new Error("Failed to fetch balance");
  return res.json();
}

export async function creditAccount(amount: number): Promise<OperationResult> {
  const res = await fetch(`${API_BASE}/credit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
}

export async function debitAccount(amount: number): Promise<OperationResult> {
  const res = await fetch(`${API_BASE}/debit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
}

export async function fetchTransactions(): Promise<TransactionsResponse> {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}
