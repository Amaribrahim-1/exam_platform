import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  BookOpen,
  ClipboardMinus,
  GraduationCap,
  UserRound,
} from "lucide-react";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

const studentNavItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: <GraduationCap /> },
  { to: "/student/exams", label: "Available Exams", icon: <BookOpen /> },
  {
    to: "/student/results",
    label: "Results & Reports",
    icon: <ClipboardMinus />,
  },
  {
    to: "/student/profile",
    label: "Profile",
    icon: <UserRound />,
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
