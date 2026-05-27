// src/pages/auth/Login.jsx

import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import { useUser } from "../../context/UserContext";

import "./auth.css";
import { server } from "../../main";

const Login = () => {

  const { loginUser,user } =
    useUser();

  const navigate =
    useNavigate();

  /////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [forgotEmail,
    setForgotEmail] =
    useState("");

  const [showForgot,
    setShowForgot] =
    useState(false);

  /////////////////////////////////////////////////////////
  // LOGIN
  /////////////////////////////////////////////////////////

  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    try {

      await loginUser(
        form.email,
        form.password
      );

      alert(
        "Login successful"
      );
if(user?.role=="user")
      navigate("/profile");
    else
      navigate("/admin/forms")

    } catch (error) {

      alert(
        error.message
      );
    }
  };

  /////////////////////////////////////////////////////////
  // FORGOT PASSWORD
  /////////////////////////////////////////////////////////

  const handleForgotPassword =
    async () => {

      try {

        const { data } =
          await axios.post(
            `${server}/auth/forgot-password`,
            {
              email:
                forgotEmail,
            }
          );

        alert(data.message);

        setForgotEmail("");

        setShowForgot(false);

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Something went wrong"
        );
      }
    };

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////

  return (

    <div className="auth-container">

      <form
        onSubmit={handleLogin}
        className="auth-form"
      >

        <h2 className="auth-title">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="auth-button"
        >
          Login
        </button>
        <p>Don't have an account then <Link to="/register">Register</Link></p>

        {/* FORGOT PASSWORD */}

        <p
          className="auth-forgot"
          onClick={() =>
            setShowForgot(
              !showForgot
            )
          }
        >
          Forgot Password?
        </p>

        {
          showForgot && (

            <div className="auth-forgot-box">

              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) =>
                  setForgotEmail(
                    e.target.value
                  )
                }
                className="auth-input"
              />

              <button
                type="button"
                className="auth-button"
                onClick={
                  handleForgotPassword
                }
              >
                Send Reset Link
              </button>

            </div>
          )
        }

      </form>

    </div>
  );
};

export default Login;