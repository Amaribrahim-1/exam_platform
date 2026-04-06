import {
  BookOpen,
  CirclePlus,
  ClipboardMinus,
  GraduationCap,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const navItems = [
  { to: "/instructor/dashboard", label: "Dashboard", icon: <GraduationCap /> },
  { to: "/instructor/exam-wizard", label: "Create Exam", icon: <CirclePlus /> },
  {
    to: "/instructor/exams-management",
    label: "Exams Management",
    icon: <BookOpen />,
  },
  {
    to: "/instructor/results",
    label: "Results & Reports",
    icon: <ClipboardMinus />,
  },
  {
    to: "/instructor/students",
    label: "Students",
    icon: <UserRound />,
  },
];

function Sidbar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static md:row-span-2 border-r border-border bg-surface flex flex-col p-md md:p-md transition-all duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-65 h-screen md:h-auto overflow-y-auto md:overflow-visible`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden p-xs text-text-muted hover:text-primary transition-colors"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <NavLink
          to="/instructor/dashboard"
          className="mb-xl px-sm pt-2 md:pt-0"
        >
          <h1 className="text-xl font-display font-bold text-primary flex items-center gap-sm">
            <span className="w-8 h-8 text-primary rounded-md flex items-center justify-center text-lg">
              <GraduationCap className="w-8 h-8" />
            </span>
            Exam.io
          </h1>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-sm">
          <p className="text-text-faint text-xs font-bold uppercase tracking-widest px-sm mb-lg">
            Menu
          </p>

          {navItems.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={onClose}
            />
          ))}
        </nav>

        {/* User Profile Card (Bottom) */}
        <div className="mt-auto p-sm bg-surface-2 rounded-lg border border-border flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary font-bold text-sm bg-surface-2 group-hover:border-primary transition-colors flex-shrink-0">
            AI
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-text truncate">Amar Ibrahim</p>
            <p className="text-xs text-text-muted truncate">Instructor</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidbar;
