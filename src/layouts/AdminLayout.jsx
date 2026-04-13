import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Main from "../components/Main";

function AdminLayout() {
  return (
    <div className='bg-bg flex h-screen w-full flex-col font-sans md:grid md:grid-cols-[260px_1fr] md:grid-rows-[64px_1fr]'>
      {/* Mobile and Desktop Sidebar */}
      <ScrollToTop />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AdminLayout;
