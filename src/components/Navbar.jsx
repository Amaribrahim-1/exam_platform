import { LogOutIcon, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const pageTitle = location.pathname
    .slice(12)
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <header className="md:col-span-1 border-b border-border bg-surface flex items-center justify-between px-md md:px-xl py-sm gap-md md:gap-lg">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex items-center justify-center p-xs text-text-muted hover:text-primary transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Page Title */}
      <div className="text-text-muted text-sm md:text-lg font-bold flex-1 md:flex-initial">
        <span className="text-text">{pageTitle}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-md md:gap-lg">
        {/* <button className="relative p-xs text-text-muted hover:text-primary transition-colors">
          🔔
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full animate-pulse-red"></span>
        </button> */}

        <div className="hidden md:flex items-center gap-4 group cursor-pointer">
          {/* Name and Role */}
          <div className="flex flex-col text-right">
            <span className="text-base font-bold text-text leading-none">
              Amar Ibrahim
            </span>
            {/* <span className="text-xs text-text-muted font-medium mt-1">
              Teacher
            </span> */}
          </div>

          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary font-bold text-sm bg-surface-2 group-hover:border-primary transition-colors">
            AI
          </div>
        </div>

        {/* Mobile Avatar */}
        <div className="md:hidden w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary font-bold text-xs bg-surface-2">
          AI
        </div>

        <button className="p-xs text-text-muted hover:text-danger transition-colors cursor-pointer">
          <LogOutIcon size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
