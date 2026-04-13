import { useNavigate, Outlet } from "react-router-dom";
import useUser from "../features/auth/hooks/useUser";
import { useEffect } from "react";
import Loader from "./Loader";

const roleHomeMap = {
  admin: "/admin/dashboard",
  instructor: "/instructor/dashboard",
  student: "/student/dashboard",
};

function RoleRoute({ allowedRoles }) {
  const { user, isFetchingUser } = useUser();
  const navigate = useNavigate();

  console.log(user);

  useEffect(
    function () {
      console.log({ isFetchingUser, user, allowedRoles }); // ← هنا
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
