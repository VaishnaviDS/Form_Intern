// src/pages/admin/AdminForms.jsx

import {
  useEffect,
  useState,
} from "react";

import { useAdmin } from "../../context/AdminContext";

import "./adminForm.css";

const AdminForms = () => {

  const {
    getForms,
    getAllSubmissions,
    createForm,
    editForm,
    deleteForm,
  } = useAdmin();

  /////////////////////////////////////////////////////////
  // STATES
  /////////////////////////////////////////////////////////

  const [forms, setForms] =
    useState([]);

  const [submissions,
    setSubmissions] =
    useState([]);

  const [openDropdown,
    setOpenDropdown] =
    useState(null);

  /////////////////////////////////////////////////////////
  // MODAL STATES
  /////////////////////////////////////////////////////////

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [fields, setFields] =
    useState([]);

  /////////////////////////////////////////////////////////
  // FETCH DATA
  /////////////////////////////////////////////////////////

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const formsData =
        await getForms();

      const submissionsData =
        await getAllSubmissions();

      setForms(formsData);

      setSubmissions(
        submissionsData
      );

    } catch (error) {

      console.log(error);
    }
  };

  /////////////////////////////////////////////////////////
  // FILTER RESPONSES
  /////////////////////////////////////////////////////////

  const getResponsesByForm = (
    formId
  ) => {

    return submissions.filter(
      (item) =>
        item.formId?._id === formId
    );
  };

  /////////////////////////////////////////////////////////
  // ADD FIELD
  /////////////////////////////////////////////////////////

  const addField = () => {

    setFields([
      ...fields,
      {
        label: "",
        type: "text",
        required: false,
      },
    ]);
  };

  /////////////////////////////////////////////////////////
  // HANDLE FIELD CHANGE
  /////////////////////////////////////////////////////////

  const handleFieldChange = (
    index,
    key,
    value
  ) => {

    const updated = [...fields];

    updated[index][key] = value;

    setFields(updated);
  };

  /////////////////////////////////////////////////////////
  // OPEN CREATE MODAL
  /////////////////////////////////////////////////////////

  const openCreateModal = () => {

    setEditId(null);

    setTitle("");

    setFields([]);

    setShowModal(true);
  };

  /////////////////////////////////////////////////////////
  // OPEN EDIT MODAL
  /////////////////////////////////////////////////////////

  const openEditModal = (
    form
  ) => {

    setEditId(form._id);

    setTitle(form.title);

    const filteredFields =
      form.fields.filter(
        (field) =>
          ![
            "name",
            "email",
            "message",
          ].includes(field.label)
      );

    setFields(filteredFields);

    setShowModal(true);
  };

  /////////////////////////////////////////////////////////
  // CREATE / EDIT FORM
  /////////////////////////////////////////////////////////

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      if (editId) {

        await editForm(
          editId,
          {
            title,
            fields,
          }
        );

        alert(
          "Form updated successfully"
        );

      } else {

        await createForm({
          title,
          fields,
        });

        alert(
          "Form created successfully"
        );
      }

      setShowModal(false);

      fetchData();

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  /////////////////////////////////////////////////////////
  // DELETE FORM
  /////////////////////////////////////////////////////////

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this form?"
      );

    if (!confirmDelete) return;

    try {

      await deleteForm(id);

      alert(
        "Form deleted successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////

  return (

    <div className="adminforms-container">

      <div className="adminforms-wrapper">

        <div className="adminforms-header">

          <h1 className="adminforms-title">
            Admin Forms
          </h1>

          <button
            className="adminforms-create-btn"
            onClick={
              openCreateModal
            }
          >
            Create Form
          </button>

        </div>

        {
          forms.map((form) => {

            const responses =
              getResponsesByForm(
                form._id
              );

            return (

              <div
                key={form._id}
                className="adminforms-card"
              >

                <h2 className="adminforms-form-title">
                  {form.title}
                </h2>

                <p className="adminforms-response-count">

                  Total Responses:
                  {" "}
                  {responses.length}

                </p>

                <div className="adminforms-action-buttons">

                  <button
                    className="adminforms-edit-btn"
                    onClick={() =>
                      openEditModal(
                        form
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="adminforms-delete-btn"
                    onClick={() =>
                      handleDelete(
                        form._id
                      )
                    }
                  >
                    Delete
                  </button>

                  <button
                    className="adminforms-button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown ===
                        form._id
                          ? null
                          : form._id
                      )
                    }
                  >

                    {
                      openDropdown ===
                      form._id
                        ? "Hide Responses"
                        : "View Responses"
                    }

                  </button>

                </div>

                {
                  openDropdown ===
                    form._id && (

                    <div className="adminforms-dropdown">

                      {
                        responses.length ===
                        0 ? (

                          <p className="adminforms-no-response">
                            No Responses
                          </p>

                        ) : (

                          responses.map(
                            (
                              response
                            ) => (

                              <div
                                key={
                                  response._id
                                }
                                className="adminforms-response-card"
                              >

                                <h4 className="adminforms-user">

                                  User:
                                  {" "}
                                  {
                                    response
                                      .userId
                                      ?.name
                                  }

                                </h4>

                                <p className="adminforms-email">

                                  Email:
                                  {" "}
                                  {
                                    response
                                      .userId
                                      ?.email
                                  }

                                </p>

                                <hr className="adminforms-divider" />

                                <div className="adminforms-answers">

                                  {
                                    response.answers.map(
                                      (
                                        answer,
                                        index
                                      ) => (

                                        <div
                                          key={
                                            index
                                          }
                                          className="adminforms-answer"
                                        >

                                          <span className="adminforms-answer-label">

                                            {
                                              answer.fieldLabel
                                            }
                                            :

                                          </span>

                                          <span className="adminforms-answer-value">

                                            {" "}
                                            {
                                              answer.value
                                            }

                                          </span>

                                        </div>
                                      )
                                    )
                                  }

                                </div>

                              </div>
                            )
                          )
                        )
                      }

                    </div>
                  )
                }

              </div>
            );
          })
        }

      </div>

      {/* /////////////////////////////////////////////////////////
          MODAL
      ///////////////////////////////////////////////////////// */}

      {
        showModal && (

          <div className="adminforms-modal-overlay">

            <div className="adminforms-modal">

              <h2 className="adminforms-modal-title">

                {
                  editId
                    ? "Edit Form"
                    : "Create Form"
                }

              </h2>

              <p className="adminforms-modal-info">

                Default fields:
                Name, Email, Message
                already exist.

              </p>

              <form
                onSubmit={
                  handleSubmit
                }
                className="adminforms-modal-form"
              >

                <input
                  type="text"
                  placeholder="Form Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="adminforms-modal-input"
                />

                <button
                  type="button"
                  onClick={addField}
                  className="adminforms-add-field-btn"
                >
                  Add Field
                </button>

                {
                  fields.map(
                    (
                      field,
                      index
                    ) => (

                      <div
                        key={index}
                        className="adminforms-field-card"
                      >

                        <input
                          type="text"
                          placeholder="Field Label"
                          value={field.label}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          className="adminforms-modal-input"
                        />

                        <select
                          value={field.type}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "type",
                              e.target.value
                            )
                          }
                          className="adminforms-modal-select"
                        >

                          <option value="text">
                            Text
                          </option>

                          <option value="email">
                            Email
                          </option>

                          <option value="number">
                            Number
                          </option>

                          <option value="textarea">
                            Textarea
                          </option>

                        </select>

                      </div>
                    )
                  )
                }

                <div className="adminforms-modal-actions">

                  <button
                    type="submit"
                    className="adminforms-save-btn"
                  >

                    {
                      editId
                        ? "Update Form"
                        : "Create Form"
                    }

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(
                        false
                      )
                    }
                    className="adminforms-cancel-btn"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default AdminForms;