import useUser from "@/features/auth/hooks/useUser";
import { GraduationCap, X } from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { seedExams } from "../services/seedExams";
import SidebarLink from "./SidebarLink";

function Sidebar({ isOpen, onClose, navItems }) {
  const location = useLocation();
  const pageTitle = location.pathname.includes("instructor");
  const { user } = useUser();
  const role = user?.role || "Student";
  const displayAvatar = user?.avatar || "/default_avatar.png";

  const { examId } = useParams();
  const isExamSession = examId && !location.pathname.includes("exam-result");

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
        <NavLink className='mb-xl px-sm pt-2 md:pt-0'>
          <div className='font-display text-primary gap-sm flex items-center'>
            <GraduationCap size={50} />
            <div className='flex flex-col items-start'>
              <h1 className='text-primary flex items-center justify-center rounded-md text-xl font-bold'>
              Exam.io
              </h1>
              <p className='text-primary-faint text-xs font-medium'>
                {role === "student"
                  ? "Student"
                  : role === "instructor"
                    ? "Instructor"
                    : "Admin"}{" "}
                Portal
              </p>
            </div>
          </div>
        </NavLink>
        {/* Navigation Links */}
        <nav className='space-y-sm flex-1'>
          <p className='text-text-faint px-sm mb-lg text-xs font-bold tracking-widest uppercase'>
            Menu
          </p>

          {!isExamSession &&
            navItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={onClose}
              />
            ))}
        </nav>

        {pageTitle && (
          <button
            className='p-xs hover:text-primary bg-surface-2 border-border px-md py-md mb-lg text-text text-md cursor-pointer rounded-lg border font-bold transition-colors'
            onClick={() => seedExams()}
          >
            Generate 5 Fake Exams
          </button>
        )}

        {/* User Profile Card (Bottom) */}
        <div className='p-sm bg-surface-2 border-border gap-sm mt-auto flex items-center rounded-lg border'>
          <div className='border-border text-primary bg-surface-2 group-hover:border-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors'>
            <img
              src={displayAvatar}
              alt={user?.fullName}
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='flex-1 overflow-hidden'>
            <p className='text-text truncate text-sm font-bold'>
              {user?.fullName}
            </p>
            <p className='text-text-muted truncate text-xs'>
              {role === "student"
                ? "Student"
                : role === "instructor"
                  ? "Instructor"
                  : "Admin"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
