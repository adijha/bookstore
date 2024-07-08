import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";

const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]); // jab jab logout button pr hit krenge tab tab logout function invoked hoga

  return <Navigate to="/login" />;
};

export default Logout;
