// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import useUser from "../features/auth/hooks/useUser";
// import Loader from "./Loader";

import useUser from "@/features/auth/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

// const roleHomeMap = {
//   admin: "/admin/dashboard",
//   instructor: "/instructor/dashboard",
//   student: "/student/dashboard",
// };

// function RoleRoute({ allowedRoles }) {
//   const { user, isFetchingUser } = useUser();
//   const navigate = useNavigate();

//   useEffect(
//     function () {
//       if (!isFetchingUser && user && !allowedRoles.includes(user.role)) {
//         navigate(roleHomeMap[user.role]);
//       }
//     },
//     [user, isFetchingUser, navigate, allowedRoles],
//   );

//   if (isFetchingUser) return <Loader />;

//   if (user && allowedRoles.includes(user.role)) return <Outlet />;

//   return null;
// }

// export default RoleRoute;

const roleHomeMap = {
  admin: "/admin/dashboard",
  instructor: "/instructor/dashboard",
  student: "/student/dashboard",
};

function RoleRoute({ allowedRoles }) {
  const { user, isFetchingUser } = useUser();

  if (isFetchingUser) return <Loader />;

  // لو اليوزر داخل بس بيحاول يدخل صفحة مش بتاعته (مثلاً طالب داخل صفحة مدرس)
  if (user && !allowedRoles.includes(user.role)) {
    // وديه للداشبورد المناسبة لدوره فوراً
    return <Navigate to={roleHomeMap[user.role]} replace />;
  }

  // لو اليوزر معاه الصلاحية، اعرض الصفحة
  return user && allowedRoles.includes(user.role) ? <Outlet /> : null;
}

export default RoleRoute;
