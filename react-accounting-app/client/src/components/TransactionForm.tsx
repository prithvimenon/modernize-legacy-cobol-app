import { useState } from "react";

interface TransactionFormProps {
  type: "CREDIT" | "DEBIT";
  onSubmit: (amount: number) => Promise<void>;
  disabled: boolean;
}

export default function TransactionForm({ type, onSubmit, disabled }: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isCredit = type === "CREDIT";
  const label = isCredit ? "Credit" : "Debit";
  const bgColor = isCredit ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700";
  const borderColor = isCredit ? "focus:ring-emerald-500" : "focus:ring-red-500";
  const iconBg = isCredit ? "bg-emerald-50" : "bg-red-50";
  const iconText = isCredit ? "text-emerald-600" : "text-red-600";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed < 0) return;

    setSubmitting(true);
    try {
      await onSubmit(parsed);
      setAmount("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
          <span className={`text-xl font-bold ${iconText}`}>
            {isCredit ? "+" : "−"}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{label} Account</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={disabled || submitting}
            className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${borderColor} disabled:opacity-50 text-gray-900`}
          />
        </div>
        <button
          type="submit"
          disabled={disabled || submitting || !amount}
          className={`px-6 py-3 rounded-xl text-white font-semibold ${bgColor} disabled:opacity-50 transition-colors`}
        >
          {submitting ? "..." : label}
        </button>
      </form>
    </div>
  );
}
