import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidbar from "../components/Sidbar";

function InstructorLayout() {
  return (
    <>
      <Sidbar />
      <Navbar />
      <Outlet />
    </>
  );
}

export default InstructorLayout;
