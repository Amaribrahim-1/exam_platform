import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useState } from "react";
import ScrollToTop from "../components/ScrollToUP";

function InstructorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='bg-bg flex h-screen w-full flex-col overflow-hidden font-sans md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr]'>
      {/* Mobile and Desktop Sidebar */}
      <ScrollToTop />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default InstructorLayout;
