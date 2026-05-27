import Form from "../models/Form.js";
import FormResponse from "../models/FormResponse.js";


// CREATE FORM
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;

    // default fields
    const defaultFields = [
      {
        label: "name",
        type: "text",
        required: true,
      },
      {
        label: "email",
        type: "email",
        required: true,
      },
      {
        label: "message",
        type: "textarea",
        required: true,
      },
    ];

    const form = await Form.create({
      title,
      createdBy: req.user.id,
      fields: [...defaultFields, ...fields],
    });

    res.status(201).json({
      message: "Form created successfully",
      form,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL FORMS
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();

    res.json(forms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL FORM SUBMISSIONS
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await FormResponse.find()
      .populate("userId", "name email")
      .populate("formId", "title");

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const editForm = async (req, res) => {
  try {

    const { id } = req.params;

    const { title, fields } =
      req.body;

    const form =
      await Form.findById(id);

    if (!form) {

      return res.status(404).json({
        message: "Form not found",
      });
    }

    form.title = title;

    form.fields = [
      {
        label: "name",
        type: "text",
        required: true,
      },
      {
        label: "email",
        type: "email",
        required: true,
      },
      {
        label: "message",
        type: "textarea",
        required: true,
      },
      ...fields,
    ];

    await form.save();

    res.json({
      message:
        "Form updated successfully",
      form,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteForm = async (req, res) => {
  try {

    const { id } = req.params;

    const form =
      await Form.findById(id);

    if (!form) {

      return res.status(404).json({
        message: "Form not found",
      });
    }

    /////////////////////////////////////////////////////////
    // DELETE FORM RESPONSES
    /////////////////////////////////////////////////////////

    await FormResponse.deleteMany({
      formId: id,
    });

    /////////////////////////////////////////////////////////
    // DELETE FORM
    /////////////////////////////////////////////////////////

    await Form.findByIdAndDelete(id);

    res.json({
      message:
        "Form deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};