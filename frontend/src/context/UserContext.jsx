// src/context/UserContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({
  children,
}) => {

  /////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [token, setToken] =
    useState(
      localStorage.getItem(
        "token"
      ) || ""
    );
  /////////////////////////////////////////////////////////
  // AXIOS INSTANCE
  /////////////////////////////////////////////////////////

  const axiosInstance =
    axios.create({
      baseURL:
        `${server}`,
    });

  /////////////////////////////////////////////////////////
  // REGISTER
  /////////////////////////////////////////////////////////

  const registerUser = async (
    formData
  ) => {

    try {

      setLoading(true);

      const { data } =
        await axiosInstance.post(
          "/auth/register",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////
  // LOGIN
  /////////////////////////////////////////////////////////

  const loginUser = async (
    email,
    password
  ) => {

    try {

      setLoading(true);

      const { data } =
        await axiosInstance.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

if (data.token) {

  localStorage.setItem(
    "token",
    data.token
  );

  setToken(data.token)
  await getProfile();
  
}

      return data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////
  // GET PROFILE
  /////////////////////////////////////////////////////////

  const getProfile = async () => {

    try {

      const { data } =
        await axiosInstance.get(
          "/auth/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUser(data);

      return data;

    } catch (error) {

      console.log(error);
      setUser(null);
    }
  };

  /////////////////////////////////////////////////////////
  // GET ALL FORMS
  /////////////////////////////////////////////////////////

  const getAllForms = async () => {

    try {

      const { data } =
        await axiosInstance.get(
          "/form/forms",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "ALL FORMS:",
        data
      );

      return data;

    } catch (error) {

      console.log(error);

      throw (
        error.response?.data ||
        error
      );
    }
  };

  /////////////////////////////////////////////////////////
  // GET SINGLE FORM
  /////////////////////////////////////////////////////////

  const getSingleForm = async (
    id
  ) => {

    try {

      const { data } =
        await axiosInstance.get(
          `/form/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );
    }
  };

  /////////////////////////////////////////////////////////
  // SUBMIT FORM
  /////////////////////////////////////////////////////////

  const submitForm = async (
    formData
  ) => {

    try {

      const { data } =
        await axiosInstance.post(
          "/form/submit",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );
    }
  };

  /////////////////////////////////////////////////////////
  // MY FORMS
  /////////////////////////////////////////////////////////

  const getMyForms = async () => {

    try {

      const { data } =
        await axiosInstance.get(
          "/form/my-forms",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return data;

    } catch (error) {

      throw (
        error.response?.data ||
        error
      );
    }
  };

  /////////////////////////////////////////////////////////
  // LOGOUT
  /////////////////////////////////////////////////////////

  const logoutUser = () => {

    localStorage.removeItem(
      "token"
    );

    setToken("");

    setUser(null);
  };
const updateProfileImage = async (
  formData
) => {

  try {

    const { data } =
      await axiosInstance.put(
        "/auth/profile-image",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    await getProfile();

    return data;

  } catch (error) {

    throw (
      error.response?.data ||
      error
    );
  }
};
  /////////////////////////////////////////////////////////
  // LOAD PROFILE ON REFRESH
  /////////////////////////////////////////////////////////

useEffect(() => {

  const loadUser = async () => {

    if (token) {

      await getProfile();
    }

    setLoading(false);
  };

  loadUser();

}, [token]);

  /////////////////////////////////////////////////////////
  // PROVIDER
  /////////////////////////////////////////////////////////

  return (
    <UserContext.Provider
      value={{

        user,
        token,
        loading,

        registerUser,
        loginUser,
        logoutUser,

        getProfile,

        getAllForms,
        getSingleForm,

        submitForm,
        getMyForms,
        updateProfileImage

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/////////////////////////////////////////////////////////
// CUSTOM HOOK
/////////////////////////////////////////////////////////

export const useUser = () =>
  useContext(UserContext);