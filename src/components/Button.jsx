const variations = {
  primary: "bg-primary text-white hover:brightness-110",
  secondary: "border border-border text-text hover:bg-surface-2",
  danger: "bg-danger/20 text-danger border border-danger/30 hover:bg-danger/30",
  outline: "border border-primary text-primary hover:bg-primary/10",
  ghost: "text-text-muted hover:bg-surface/50 hover:text-text",
  accent: "bg-accent text-bg hover:bg-opacity-90",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-base sm:text-lg",
  icon: "p-2",
};

function Button({
  children,
  onClick,
  variation = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  title = "",
}) {
  const baseClasses = `inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${variations[variation]} ${sizes[size]} ${className}`;

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      title={title}
    >
      {children}
    </button>
  );
}

export default Button;
