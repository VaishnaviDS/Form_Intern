import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    answers: [
      {
        fieldLabel: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FormResponse", formResponseSchema);