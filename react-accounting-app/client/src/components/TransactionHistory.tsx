import type { Transaction } from "../types";

interface TransactionHistoryProps {
  transactions: Transaction[];
  loading: boolean;
}

export default function TransactionHistory({ transactions, loading }: TransactionHistoryProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No transactions yet</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    tx.type === "CREDIT"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {tx.type === "CREDIT" ? "+" : "−"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.type}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold tabular-nums ${
                    tx.type === "CREDIT" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "CREDIT" ? "+" : "−"}$
                  {tx.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 tabular-nums">
                  Balance: $
                  {tx.newBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
