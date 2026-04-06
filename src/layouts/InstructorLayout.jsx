import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidbar from "../components/Sidbar";
import Main from "../components/Main";
import { useState } from "react";

function InstructorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr] flex flex-col h-screen w-full overflow-hidden bg-bg font-sans">
      {/* Mobile and Desktop Sidebar */}
      <Sidbar isOpen={isSidebarOpen} onClose={closeSidebar} />

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
