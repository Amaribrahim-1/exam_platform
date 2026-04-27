import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BookOpen, FileBarChart, LayoutDashboardIcon, Users } from "lucide-react";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

const adminNavItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    to: "/admin/users",
    label: "User Management",
    icon: <Users />,
  },
  {
    to: "/admin/exams",
    label: "Exam Oversight",
    icon: <BookOpen />,
  },
  {
    to: "/admin/reports",
    label: "Reports",
    icon: <FileBarChart />,
  },
];

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='bg-bg flex h-screen w-full flex-col font-sans md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr]'>
      <ScrollToTop />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        navItems={adminNavItems}
      />
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AdminLayout;
