// src/components/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {

  const { user, logoutUser } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#111",
        color: "white",
      }}
    >
      <h2>Dynamic Forms</h2>

      <nav
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {!user && (
        <>
  <Link to="/register" style={linkStyle}>Sign up</Link>
<Link to="/login" style={linkStyle}>Login</Link>
        </>)}
        {/* ================= USER NAVBAR ================= */}
        {user?.role === "user" && (
          <>
            <Link to="/" style={linkStyle}>
              Home
            </Link>

            <Link to="/forms" style={linkStyle}>
              Forms
            </Link>

            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
          </>
        )}

        {/* ================= ADMIN NAVBAR ================= */}
        {user?.role === "admin" && (
          <>
            <Link to="/" style={linkStyle}>
              Home
            </Link>

            <Link to="/admin/forms" style={linkStyle}>
              All Forms
            </Link>
            {/* <Link to="/admin/create-form" style={linkStyle}> Create forms
            </Link>

            <Link to="/admin/profile" style={linkStyle}>
              Profile
            </Link> */}
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Header;
