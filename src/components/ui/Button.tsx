import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gold";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm md:text-base font-medium tracking-wide transition-all duration-300 rounded-full";

  const variants = {
    primary: "bg-coral text-white hover:bg-coral-dark",
    secondary:
      "border border-text/30 text-text hover:border-gold hover:text-gold bg-transparent",
    ghost: "text-text hover:text-gold underline-offset-4 hover:underline",
    gold: "bg-coral text-white hover:bg-coral-dark",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
