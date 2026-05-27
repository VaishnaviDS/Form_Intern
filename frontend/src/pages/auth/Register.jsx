// src/pages/auth/Register.jsx

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useUser } from "../../context/UserContext";

import "./auth.css";

const Register = () => {

  const { registerUser } =
    useUser();

  const navigate =
    useNavigate();

  /////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "user",
    });

  const [image, setImage] =
    useState(null);

  /////////////////////////////////////////////////////////
  // REGISTER
  /////////////////////////////////////////////////////////

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        const formData =
          new FormData();

        formData.append(
          "name",
          form.name
        );

        formData.append(
          "email",
          form.email
        );

        formData.append(
          "password",
          form.password
        );

        formData.append(
          "role",
          form.role
        );

        if (image) {

          formData.append(
            "profileImage",
            image
          );
        }

        const res =
          await registerUser(
            formData
          );

        alert(
          res.message
        );

        navigate("/login");

      } catch (error) {

        alert(
          error.message
        );
      }
    };

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////

  return (

    <div className="auth-container">

      <form
        onSubmit={
          handleRegister
        }
        className="auth-form"
      >

        <h2 className="auth-title">
          Register
        </h2>

        {/* NAME */}

        <input
          type="text"
          placeholder="Name"
          className="auth-input"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        {/* ROLE */}

        <select
          className="auth-select"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target.value,
            })
          }
        >

          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        {/* IMAGE */}

        <input
          type="file"
          className="auth-file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="auth-button"
        >
          Register
        </button>

        <p className="auth-bottom-text">

          Already have an account?

          <Link
            to="/login"
            className="auth-link"
          >
            {" "}
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;