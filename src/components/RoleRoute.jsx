// import useUser from "@/features/auth/hooks/useUser";
// import { Navigate, Outlet } from "react-router-dom";

// const roleHomeMap = {
//   admin: "/admin/dashboard",
//   instructor: "/instructor/dashboard",
//   student: "/student/dashboard",
// };

// function RoleRoute({ allowedRoles }) {
//   const { user, isFetchingUser } = useUser();

//   if (isFetchingUser) return <Loader />;

//   // لو اليوزر داخل بس بيحاول يدخل صفحة مش بتاعته (مثلاً طالب داخل صفحة مدرس)
//   if (user && !allowedRoles.includes(user.role)) {
//     // وديه للداشبورد المناسبة لدوره فوراً
//     return <Navigate to={roleHomeMap[user.role]} replace />;
//   }

//   // لو اليوزر معاه الصلاحية، اعرض الصفحة
//   return user && allowedRoles.includes(user.role) ? <Outlet /> : null;
// }

// export default RoleRoute;

import useUser from "@/features/auth/hooks/useUser";
import useStudentProfile from "@/features/student/profile/hooks/useStudentProfile";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/Loader";

const roleHomeMap = {
  admin: "/admin/dashboard",
  instructor: "/instructor/dashboard",
  student: "/student/dashboard",
};

function RoleRoute({ allowedRoles }) {
  const { user, isFetchingUser } = useUser();
  const { profile, isFetchingProfile } = useStudentProfile(
    user?.role === "student" ? user?.id : null,
  );

  if (isFetchingUser || (user?.role === "student" && isFetchingProfile))
    return <Loader />;

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHomeMap[user.role]} replace />;
  }

  if (
    user?.role === "student" &&
    profile &&
    (!profile.grade || !profile.department)
  ) {
    return <Navigate to='/complete-profile' replace />;
  }

  return user && allowedRoles.includes(user.role) ? <Outlet /> : null;
}

export default RoleRoute;
