import { useNavigate, Outlet } from "react-router-dom";
import useUser from "../features/auth/hooks/useUser";
import { useEffect } from "react";
import Loader from "./Loader";
import supabase from "@/services/supabase";

const roleHomeMap = {
  admin: "/admin/dashboard",
  instructor: "/instructor/dashboard",
  student: "/student/home",
};

function RoleRoute({ allowedRoles }) {
  const { user, isFetchingUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
    });
  }, [navigate]);

  useEffect(
    function () {
      if (!isFetchingUser && user && !allowedRoles.includes(user.role)) {
        navigate(roleHomeMap[user.role]);
      }
    },
    [user, isFetchingUser, navigate, allowedRoles],
  );

  useEffect(
    function () {
      if (!isFetchingUser && user && !allowedRoles.includes(user.role)) {
        navigate(roleHomeMap[user.role]);
      }
    },
    [user, isFetchingUser, navigate, allowedRoles],
  );

  if (isFetchingUser) return <Loader />;

  if (user && allowedRoles.includes(user.role)) return <Outlet />;

  return null;
}

export default RoleRoute;
