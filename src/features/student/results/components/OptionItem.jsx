function OptionItem({ label, text, state }) {
  // state: "correct" | "wrong" | "missed" | "neutral"
  const styles = {
    correct: {
      wrapper: "border-accent/50 bg-accent/8",
      label: "bg-accent text-bg",
      text: "text-accent",
      icon: "✓",
    },
    wrong: {
      wrapper: "border-danger/50 bg-danger/8",
      label: "bg-danger text-bg",
      text: "text-danger",
      icon: "✗",
    },
    missed: {
      wrapper: "border-accent/40 bg-accent/5",
      label: "bg-accent/20 text-accent",
      text: "text-accent",
      icon: "✓",
    },
    neutral: {
      wrapper: "border-border bg-surface-2/40",
      label: "bg-surface-2 text-text-muted",
      text: "text-text-muted",
      icon: null,
    },
  };

  const s = styles[state];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${s.wrapper}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${s.label}`}
      >
        {label}
      </span>
      <span className={`flex-1 text-sm font-medium ${s.text}`}>{text}</span>
      {s.icon && (
        <span
          className={`text-sm font-bold ${
            state === "wrong" ? "text-danger" : "text-accent"
          }`}
        >
          {s.icon}
        </span>
      )}
    </div>
  );
}

export default OptionItem;
