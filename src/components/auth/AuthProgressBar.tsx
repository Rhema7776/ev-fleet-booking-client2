interface AuthProgressBarProps {
  current: number;
  total?: number;
}

const AuthProgressBar = ({ current, total = 4 }: AuthProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, ((current + 1) / total) * 100));

  return (
    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-brand-primary transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default AuthProgressBar;
