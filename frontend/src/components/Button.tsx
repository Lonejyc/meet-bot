import Link from "next/link";

type ButtonVariant = "filled" | "outline";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  children,
  variant = "filled",
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center rounded-full px-6 py-2.5",
    "font-sans font-bold text-sm cursor-pointer select-none",
    "transition-all duration-200 ease-out",
    "hover:scale-105 hover:shadow-lg",
    "active:scale-95 active:shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
  ].join(" ");

  const variants: Record<ButtonVariant, string> = {
    filled:
      "bg-accent text-primary hover:brightness-110 active:brightness-95",
    outline:
      "border-2 border-accent text-accent bg-transparent hover:bg-accent/10 active:bg-accent/20",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
