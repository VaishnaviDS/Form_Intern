import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  label: String,

  type: {
    type: String,
    enum: ["text", "email", "number", "textarea"],
    default: "text",
  },

  required: {
    type: Boolean,
    default: false,
  },
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fields: [fieldSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Form", formSchema);