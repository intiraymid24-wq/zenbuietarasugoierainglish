interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
