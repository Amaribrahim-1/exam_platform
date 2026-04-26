import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

function AdminLayout() {
  return (
    <div className='bg-bg flex h-screen w-full flex-col font-sans'>
      <ScrollToTop />
      <Navbar />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AdminLayout;
