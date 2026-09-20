/**
 * Reusable content-section component.
 *
 * This is a data-driven section shell that can be used for feature lists, content
 * blocks, or comparison cards. The variant prop lets teams reuse the same pattern
 * across multiple contexts while keeping the API simple and consistent.
 */
type SectionItem = {
  title: string;
  description: string;
  value?: string;
};

export function ContentSection({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  centered = false,
  variant = "default",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: SectionItem[];
  columns?: 2 | 3 | 4;
  centered?: boolean;
  variant?: "default" | "highlight" | "split";
}) {
  const gridClassName = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns];

  const wrapperClassName =
    variant === "highlight"
      ? "rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 lg:p-12"
      : variant === "split"
        ? "rounded-[2rem] border border-slate-800 bg-slate-900/60 p-8"
        : "";

  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 lg:px-8 ${wrapperClassName}`}>
      <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        <p className="text-sm font-medium tracking-[0.2em] text-cyan-300 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
        ) : null}
      </div>

      <div className={`mt-12 grid gap-6 ${gridClassName}`}>
        {items.map((item) => (
          <article
            key={item.title}
            className={
              variant === "highlight"
                ? "rounded-3xl border border-slate-700 bg-slate-950/60 p-6"
                : "rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
            }
          >
            {item.value ? (
              <div className="mb-4 text-3xl font-black text-white">{item.value}</div>
            ) : null}
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
