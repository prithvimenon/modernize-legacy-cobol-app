interface BalanceCardProps {
  balance: number;
  loading: boolean;
}

export default function BalanceCard({ balance, loading }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Current Balance
      </h2>
      {loading ? (
        <div className="animate-pulse h-12 bg-gray-200 rounded-lg w-48 mx-auto" />
      ) : (
        <p className="text-5xl font-bold text-gray-900 tabular-nums">
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-3">
        Migrated from COBOL PIC 9(6)V99 format
      </p>
    </div>
  );
}
