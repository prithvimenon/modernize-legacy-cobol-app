import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-emerald-800" : "text-red-800";
  const icon = type === "success" ? "✓" : "✕";
  const iconBg = type === "success" ? "bg-emerald-100" : "bg-red-100";

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${bgColor} shadow-lg animate-[slideIn_0.3s_ease-out]`}>
      <span className={`w-6 h-6 rounded-full ${iconBg} flex items-center justify-center text-sm font-bold ${textColor}`}>
        {icon}
      </span>
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      <button
        onClick={onClose}
        className={`ml-2 ${textColor} opacity-50 hover:opacity-100`}
      >
        ×
      </button>
    </div>
  );
}
