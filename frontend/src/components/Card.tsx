interface CardProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Card({ children, className = "", wide = false }: CardProps) {
  return (
    <div
      className={`relative z-10 w-full rounded-2xl bg-surface p-10 shadow-lg ${wide ? "" : "max-w-[560px]"} ${className}`}
    >
      {children}
    </div>
  );
}
