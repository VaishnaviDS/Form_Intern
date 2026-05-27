// src/context/AdminContext.jsx

import {
  createContext,
  useContext,
  useState,
} from "react";

import axios from "axios";
import { server } from "../main";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const API = `${server}`;

  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////////////////////
  // TOKEN
  /////////////////////////////////////////////////////////

  const token = localStorage.getItem("token");

  /////////////////////////////////////////////////////////
  // AXIOS INSTANCE
  /////////////////////////////////////////////////////////

  const axiosInstance = axios.create({
    baseURL: API,
  });

  axiosInstance.interceptors.request.use((config) => {

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /////////////////////////////////////////////////////////
  // CREATE FORM
  /////////////////////////////////////////////////////////

  const createForm = async (formData) => {
    try {

      setLoading(true);

      const { data } = await axiosInstance.post(
        "/admin/create-form",
        formData
      );

      return data;

    } catch (error) {

      throw error.response?.data || error;

    } finally {

      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////
  // GET ALL FORMS
  /////////////////////////////////////////////////////////

  const getForms = async () => {
    try {

      setLoading(true);

      const { data } = await axiosInstance.get(
        "/admin/forms"
      );

      return data;

    } catch (error) {

      throw error.response?.data || error;

    } finally {

      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////
  // GET ALL SUBMISSIONS
  /////////////////////////////////////////////////////////

  const getAllSubmissions = async () => {
    try {

      setLoading(true);

      const { data } = await axiosInstance.get(
        "/admin/submissions"
      );

      return data;

    } catch (error) {

      throw error.response?.data || error;

    } finally {

      setLoading(false);
    }
  };
const editForm = async (
  id,
  formData
) => {

  try {

    const { data } =
      await axios.put(
        `${API}/admin/edit/${id}`,
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
const deleteForm = async (id) => {

  try {

    const { data } =
      await axios.delete(
        `${API}/admin/delete/${id}`,
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
  // CONTEXT VALUE
  /////////////////////////////////////////////////////////

  return (
    <AdminContext.Provider
      value={{
        loading,
        createForm,
        getForms,
        getAllSubmissions,
        editForm,
deleteForm
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

/////////////////////////////////////////////////////////
// CUSTOM HOOK
/////////////////////////////////////////////////////////

export const useAdmin = () => useContext(AdminContext);