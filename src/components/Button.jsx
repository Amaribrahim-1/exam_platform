function Button({
  children,
  onClick,
  variation = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
}) {
  const baseClasses = `${variation === "primary" ? "bg-primary" : "bg-surface-2"} ${size === "sm" ? "px-xs py-sm" : "px-md py-sm"} text-text focus:ring-primary focus:ring-offset-surface  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}  rounded-md  text-sm sm:text-base font-semibold transition-all duration-200 hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:outline-none active:brightness-90`;

  return (
    <button
      className={baseClasses + " " + className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
