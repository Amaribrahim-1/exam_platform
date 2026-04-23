import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  BookOpen,
  CircleUser,
  ClipboardMinus,
  History,
  LayoutDashboardIcon,
} from "lucide-react";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

const studentNavItems = [
  {
    to: "/student/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon />,
  },
  { to: "/student/exams", label: "Available Exams", icon: <BookOpen /> },
  {
    to: "/student/exams-history",
    label: "Exam History",
    icon: <History />,
  },
  {
    to: "/student/profile",
    label: "Profile",
    icon: <CircleUser />,
  },
];

function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='bg-bg flex h-screen w-full flex-col font-sans md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr]'>
      {/* Mobile and Desktop Sidebar */}
      <ScrollToTop />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        navItems={studentNavItems}
      />
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default StudentLayout;
