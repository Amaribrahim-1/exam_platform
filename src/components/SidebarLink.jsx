import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center gap-md p-sm rounded-md transition-all duration-200 group hover:"bg-primary-glow hover:text-primary hover:border-l-4 hover:border-primary
        ${
          isActive
            ? "bg-primary-glow text-primary border-l-4 border-primary"
            : "text-text-muted hover:bg-surface-2 hover:text-text"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <div
            className={`
            w-6 h-6 flex items-center justify-center transition-colors
            ${isActive ? "text-primary" : "text-text-faint group-hover:text-text"}
          `}
          >
            {icon}
          </div>
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
