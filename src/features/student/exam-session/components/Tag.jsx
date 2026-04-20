function Tag({ color, children }) {
  const variants = {
    primary: "bg-primary/15 text-primary border-primary/30",
    accent: "bg-accent/12 text-accent border-accent/25",
    warning: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <span
      className={`px-sm py-xs rounded-full border font-mono text-[11px] font-semibold tracking-[0.03em] uppercase ${variants[color]}`}
    >
      {children}
    </span>
  );
}

export default Tag;
