const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10 max-w-3xl">
    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">{eyebrow}</p>
    <h2 className="font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">{title}</h2>
    {subtitle ? <p className="mt-4 text-muted">{subtitle}</p> : null}
  </div>
);

export default SectionTitle;
