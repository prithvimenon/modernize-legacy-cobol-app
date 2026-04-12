import { useState, useEffect, useCallback } from "react";
import { fetchBalance, creditAccount, debitAccount, fetchTransactions } from "./api";
import type { Transaction } from "./types";
import BalanceCard from "./components/BalanceCard";
import TransactionForm from "./components/TransactionForm";
import TransactionHistory from "./components/TransactionHistory";
import Notification from "./components/Notification";

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [balRes, txRes] = await Promise.all([
        fetchBalance(),
        fetchTransactions(),
      ]);
      setBalance(balRes.balance);
      setTransactions(txRes.transactions);
    } catch {
      setNotification({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCredit(amount: number) {
    const result = await creditAccount(amount);
    if (result.success) {
      setNotification({
        message: `Credited $${amount.toFixed(2)}. New balance: $${result.newBalance?.toFixed(2)}`,
        type: "success",
      });
      await loadData();
    } else {
      setNotification({
        message: result.error || "Credit failed",
        type: "error",
      });
    }
  }

  async function handleDebit(amount: number) {
    const result = await debitAccount(amount);
    if (result.success) {
      setNotification({
        message: `Debited $${amount.toFixed(2)}. New balance: $${result.newBalance?.toFixed(2)}`,
        type: "success",
      });
      await loadData();
    } else {
      setNotification({
        message: result.error || "Debit failed",
        type: "error",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Account Management System
              </h1>
              <p className="text-xs text-gray-500">
                Modernized from COBOL &rarr; React + Node.js
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <BalanceCard balance={balance} loading={loading} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm
            type="CREDIT"
            onSubmit={handleCredit}
            disabled={loading}
          />
          <TransactionForm
            type="DEBIT"
            onSubmit={handleDebit}
            disabled={loading}
          />
        </div>

        <TransactionHistory transactions={transactions} loading={loading} />

        <footer className="text-center py-6 text-xs text-gray-400">
          <p>
            Originally built in COBOL (main.cob, operations.cob, data.cob)
          </p>
          <p className="mt-1">
            Modernized to React + TypeScript + Tailwind CSS frontend with
            Node.js + Express backend
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
