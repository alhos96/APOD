import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminLogoutButton() {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Typography variant="body2" textAlign="right" className="admin-message">
      Welcome admin! &nbsp;
      <span className="link logout" onClick={logout}>
        Logout
      </span>
    </Typography>
  );
}

export default AdminLogoutButton;
