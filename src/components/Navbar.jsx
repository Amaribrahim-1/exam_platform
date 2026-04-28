import useLogout from "@/features/auth/hooks/useLogout";
import useUser from "@/features/auth/hooks/useUser";
import { LogOutIcon, Menu } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ onMenuClick }) {
  const { logout, isLoggingOut } = useLogout();
  const { user } = useUser();
  const { examId } = useParams();
  const displayAvatar = user?.avatar || "/default_image.avif";
  const location = useLocation();
  const isExamSession = examId && !location.pathname.includes("exam-result");
  const profileRoute = user?.role ? `/${user.role}/profile` : "#";

  return (
    <header className='border-border bg-surface px-md md:px-xl py-sm gap-md md:gap-lg flex items-center border-b md:col-span-1'>
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className='p-xs text-text-muted hover:text-primary flex items-center justify-center transition-colors md:hidden'
        aria-label='Toggle sidebar'
      >
        <Menu size={24} />
      </button>

      {/* Right Section */}
      <div className='gap-md md:gap-lg flex flex-1 items-center justify-end'>
        <div className='hidden items-center gap-4 md:flex'>
          {/* Name */}
          <div className='flex flex-col text-right'>
            <span className='text-text text-base leading-none font-bold'>
              {user?.fullName}
            </span>
          </div>

          {/* Avatar — Desktop */}
          <Link
            to={profileRoute}
            title='Go to profile'
            className='border-border text-primary bg-surface-2 hover:border-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors'
          >
            <img
              src={displayAvatar}
              alt={user?.fullName}
              className='h-full w-full rounded-full object-cover'
            />
          </Link>
        </div>

        {/* Avatar — Mobile */}
        <Link
          to={profileRoute}
          title='Go to profile'
          className='border-border text-primary bg-surface-2 hover:border-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors md:hidden'
        >
          <img
            src={displayAvatar}
            alt={user?.fullName}
            className='h-full w-full rounded-full object-cover'
          />
        </Link>

        {user && (
          <button
            disabled={isLoggingOut || isExamSession}
            onClick={() => {
              logout();
              toast.success("Logout successful!");
            }}
            className='p-xs text-text-muted hover:text-danger cursor-pointer transition-colors'
          >
            <LogOutIcon size={20} />
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
