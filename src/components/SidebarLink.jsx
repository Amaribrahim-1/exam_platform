import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `gap-md p-sm group hover:"bg-primary-glow hover:text-primary hover:border-primary flex items-center rounded-md transition-all duration-200 hover:border-l-4 ${
          isActive
            ? "bg-primary-glow text-primary border-primary border-l-4"
            : "text-text-muted hover:bg-surface-2 hover:text-text"
        } `
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`flex h-6 w-6 items-center justify-center transition-colors ${isActive ? "text-primary" : "text-text-faint group-hover:text-text"} `}
          >
            {icon}
          </div>
          <span className='font-medium'>{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
