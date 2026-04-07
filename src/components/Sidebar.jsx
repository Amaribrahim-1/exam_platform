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

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className='bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden'
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`border-border bg-surface p-md md:p-md fixed z-50 flex flex-col border-r transition-all duration-300 ease-in-out md:static md:row-span-2 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} h-screen w-65 overflow-y-auto md:h-auto md:overflow-visible`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={onClose}
          className='p-xs text-text-muted hover:text-primary absolute top-4 right-4 transition-colors md:hidden'
          aria-label='Close sidebar'
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <NavLink
          to='/instructor/dashboard'
          className='mb-xl px-sm pt-2 md:pt-0'
        >
          <h1 className='font-display text-primary gap-sm flex items-center text-xl font-bold'>
            <span className='text-primary flex h-8 w-8 items-center justify-center rounded-md text-lg'>
              <GraduationCap className='h-8 w-8' />
            </span>
            Exam.io
          </h1>
        </NavLink>

        {/* Navigation Links */}
        <nav className='space-y-sm flex-1'>
          <p className='text-text-faint px-sm mb-lg text-xs font-bold tracking-widest uppercase'>
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
        <div className='p-sm bg-surface-2 border-border gap-sm mt-auto flex items-center rounded-lg border'>
          <div className='border-border text-primary bg-surface-2 group-hover:border-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors'>
            AI
          </div>
          <div className='flex-1 overflow-hidden'>
            <p className='text-text truncate text-sm font-bold'>Amar Ibrahim</p>
            <p className='text-text-muted truncate text-xs'>Instructor</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
