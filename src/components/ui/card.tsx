import type { ReactNode } from "react";

export function Card({
  title,
  description,
  eyebrow,
  className = "",
  children,
}: {
  title?: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article
      className={`rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-cyan-300 uppercase">
          {eyebrow}
        </p>
      ) : null}

      {title ? <h3 className="text-xl font-semibold text-white">{title}</h3> : null}

      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
}
