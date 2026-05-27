import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./auth.css";
import { server } from "../../main";

const ResetPassword = () => {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  /////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  /////////////////////////////////////////////////////////
  // RESET PASSWORD
  /////////////////////////////////////////////////////////

  const handleResetPassword =
    async (e) => {

      e.preventDefault();

      /////////////////////////////////////////////////////////
      // CHECK PASSWORD MATCH
      /////////////////////////////////////////////////////////

      if (
        newPassword !==
        confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );
      }

      try {

        const { data } =
          await axios.post(
            `${server}/auth/reset-password/${token}`,
            {
              newPassword,
            }
          );

        alert(data.message);

        navigate("/login");

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
        onSubmit={
          handleResetPassword
        }
        className="auth-form"
      >

        <h2 className="auth-title">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="auth-input"
        />

        <button
          type="submit"
          className="auth-button"
        >
          Reset Password
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;