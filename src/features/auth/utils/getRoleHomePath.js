const roleHomeMap = {
  admin: "/admin/dashboard",
  instructor: "/instructor/dashboard",
  student: "/student/dashboard",
};

export function getRoleHomePath(role = "student") {
  return roleHomeMap[role] ?? roleHomeMap.student;
}

