// src/pages/Forms/FormPage.jsx

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import "./forms.css"

const FormPage = () => {

  const { getAllForms } =
    useUser();

  const [forms, setForms] =
    useState([]);
    const [submittedForms, setSubmittedForms] =
  useState([]);

  useEffect(() => {

    fetchForms();

  }, []);

  const fetchForms = async () => {

  try {

    const data =
      await getAllForms();

    console.log(data);

    setForms(data);

    /////////////////////////////////////////////////////////
    // CHECK SUBMITTED FORMS
    /////////////////////////////////////////////////////////

    const submitted =
      data
        .filter(
          (form) => form.isSubmitted
        )
        .map(
          (form) => form._id
        );

    setSubmittedForms(
      submitted
    );

  } catch (error) {

    console.log(error);
  }
};

  return (

  <div className="formpage-container">

    <div className="formpage-wrapper">

      <h1 className="formpage-title">
        All Forms
      </h1>

      {
        forms.length === 0 ? (

          <div className="formpage-empty">
            No Forms Found
          </div>

        ) : (

          forms.map((form) => {

            const alreadySubmitted =
              submittedForms.includes(
                form._id
              );

            return (

              <div
                key={form._id}
                className="formpage-card"
              >

                <div className="formpage-content">

                  <h2 className="formpage-form-title">
                    {form.title}
                  </h2>

                </div>

                {
                  alreadySubmitted ? (

                    <button
                      disabled
                      className="formpage-button-disabled"
                    >
                      Already Submitted
                    </button>

                  ) : (

                    <Link
                      to={`/form/${form._id}`}
                      className="formpage-link"
                    >

                      <button
                        className="formpage-button"
                      >
                        Fill Form
                      </button>

                    </Link>

                  )
                }

              </div>
            );
          })
        )
      }

    </div>

  </div>
);
};

export default FormPage;