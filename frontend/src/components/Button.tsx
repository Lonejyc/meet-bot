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
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer";
  const variants: Record<ButtonVariant, string> = {
    filled: "bg-accent text-primary",
    outline: "border-2 border-accent text-accent bg-transparent",
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
