interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`relative z-10 w-full max-w-[560px] rounded-2xl bg-surface p-10 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
