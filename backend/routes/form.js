import express from "express";


import { authenticate } from "../middleware/auth.js";
import { getAllFormsForUsers, getSingleForm, submitForm } from "../controllers/user.js";
import FormResponse from "../models/FormResponse.js";

const router = express.Router();


router.get("/forms",authenticate,getAllFormsForUsers)
router.get(
  "/my-forms",
  authenticate,
  async (req, res) => {
    try {

      const history = await FormResponse.find({
        userId: req.user.id,
      }).populate("formId");

      res.json(history);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
router.post("/submit", authenticate, submitForm);
router.get("/:id", authenticate, getSingleForm);



export default router;