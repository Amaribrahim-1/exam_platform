import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  BookOpen,
  CirclePlus,
  ClipboardMinus,
  GraduationCap,
  UserRound,
} from "lucide-react";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

const instructorNavItems = [
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

function InstructorLayout() {
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
        navItems={instructorNavItems}
      />
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default InstructorLayout;
