// src/pages/user/FormDetails.jsx

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import "./form.css"

const FormDetails = () => {

  const { id } = useParams();

  const {
    getSingleForm,
    submitForm,
  } = useUser();

  const [form, setForm] = useState(null);

  const [answers, setAnswers] = useState([]);

  /////////////////////////////////////////////////////////
  // FETCH SINGLE FORM
  /////////////////////////////////////////////////////////

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {

      const data = await getSingleForm(id);

      setForm(data);

    } catch (error) {

      console.log(error);
    }
  };

  /////////////////////////////////////////////////////////
  // HANDLE CHANGE
  /////////////////////////////////////////////////////////

  const handleChange = (label, value) => {

    const existing = answers.find(
      (item) => item.fieldLabel === label
    );

    if (existing) {

      const updated = answers.map((item) =>
        item.fieldLabel === label
          ? {
              ...item,
              value,
            }
          : item
      );

      setAnswers(updated);

    } else {

      setAnswers([
        ...answers,
        {
          fieldLabel: label,
          value,
        },
      ]);
    }
  };

  /////////////////////////////////////////////////////////
  // SUBMIT FORM
  /////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await submitForm({
        formId: form._id,
        answers,
      });

      alert(
        "Form submitted successfully"
      );

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  /////////////////////////////////////////////////////////
  // LOADING
  /////////////////////////////////////////////////////////

  if (!form) {
    return <h2>Loading...</h2>;
  }

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////

  return (

  <div className="formdetails-container">

    <div className="formdetails-wrapper">

      <h1 className="formdetails-title">
        {form.title}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="formdetails-form"
      >

        {
          form.fields
            .filter(
              (field) =>
                field.label &&
                field.label.trim() !== ""
            )
            .map(
              (field, index) => (

                <div
                  key={index}
                  className="formdetails-field"
                >

                  <label className="formdetails-label">

                    {field.label}

                    {
                      field.required && (
                        <span className="formdetails-required">
                          *
                        </span>
                      )
                    }

                  </label>

                  {
                    field.type === "textarea" ? (

                      <textarea
                        required={field.required}
                        onChange={(e) =>
                          handleChange(
                            field.label,
                            e.target.value
                          )
                        }
                        className="formdetails-textarea"
                        placeholder={`Enter ${field.label}`}
                      />

                    ) : (

                      <input
                        type={field.type}
                        required={field.required}
                        onChange={(e) =>
                          handleChange(
                            field.label,
                            e.target.value
                          )
                        }
                        className="formdetails-input"
                        placeholder={`Enter ${field.label}`}
                      />

                    )
                  }

                </div>
              )
            )
        }

        <button
          type="submit"
          className="formdetails-button"
        >
          Submit Form
        </button>

      </form>

    </div>

  </div>
);
};

export default FormDetails;