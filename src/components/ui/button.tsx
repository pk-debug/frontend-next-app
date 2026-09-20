/**
 * Shared button primitive.
 *
 * This component abstracts common button styles and supports both native buttons and
 * Next.js links. Keeping the interaction model consistent reduces design drift and
 * promotes a reliable design system across the app.
 */
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "link";
    href: string;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, variant = "primary", className = "", ...rest } = props;

  const baseClassName =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:ring-offset-2 focus:ring-offset-slate-950";

  const variantClassName = {
    primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    secondary: "border border-slate-700 bg-slate-900/70 text-white hover:border-slate-500",
    ghost: "text-slate-200 hover:bg-slate-800/80",
  }[variant];

  if ("as" in props && props.as === "link") {
    const { href, ...linkProps } = props as LinkButtonProps;
    return (
      <Link
        href={href}
        className={`${baseClassName} ${variantClassName} ${className}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
