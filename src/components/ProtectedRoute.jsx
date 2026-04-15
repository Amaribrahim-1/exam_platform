import { Navigate, Outlet } from "react-router-dom";
import useUser from "../features/auth/hooks/useUser";
import Loader from "./Loader";

function ProtectedRoute() {
  const { user, isFetchingUser } = useUser();

  if (isFetchingUser) return <Loader />;

  if (!user) return <Navigate to='/login' replace />;

  return <Outlet />;
}

export default ProtectedRoute;
