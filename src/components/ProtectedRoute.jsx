import { useEffect } from "react";
import useUser from "../features/auth/hooks/useUser";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute() {
  const { user, isFetchingUser } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isFetchingUser && !user) {
        navigate("/login");
      }
    },
    [user, navigate, isFetchingUser],
  );

  if (isFetchingUser) return <Loader />;

  if (user) return <Outlet />;

  return null;
}

export default ProtectedRoute;
