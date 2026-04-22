import useLogout from "@/features/auth/hooks/useLogout";
import useUser from "@/features/auth/hooks/useUser";
import { LogOutIcon, Menu } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ onMenuClick }) {
  const { logout, isLoggingOut } = useLogout();
  const { user } = useUser();
  const displayAvatar = user?.avatar || "/default_avatar.png";
  const { examId } = useParams();
  const location = useLocation();
  const isExamSession = examId && !location.pathname.includes("exam-result");

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
        <div className='group hidden cursor-pointer items-center gap-4 md:flex'>
          {/* Name and Role */}
          <div className='flex flex-col text-right'>
            <span className='text-text text-base leading-none font-bold'>
              Amar Ibrahim
            </span>
          </div>

          {/* Avatar Circle */}
          <div className='border-border text-primary bg-surface-2 group-hover:border-primary flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors'>
            <img
              src={displayAvatar}
              alt={user?.fullName}
              className='h-full w-full rounded-full object-cover'
            />
          </div>
        </div>

        {/* Mobile Avatar */}
        <div className='border-border text-primary bg-surface-2 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold md:hidden'>
          <img
            src={displayAvatar}
            alt={user?.fullName}
            className='h-full w-full rounded-full object-cover'
          />
        </div>

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
