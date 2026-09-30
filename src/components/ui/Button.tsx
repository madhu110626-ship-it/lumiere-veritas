import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "lime";
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
    primary:
      "bg-cream text-ink hover:bg-lime hover:text-ink",
    secondary:
      "border border-cream/40 text-cream hover:border-lime hover:text-lime bg-transparent",
    ghost:
      "text-cream hover:text-lime underline-offset-4 hover:underline",
    lime:
      "bg-lime text-ink hover:bg-cream",
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
