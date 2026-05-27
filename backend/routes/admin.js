import express from "express";

import {
  createForm,
  getForms,
  getAllSubmissions,
  editForm,
  deleteForm,
} from "../controllers/admin.js";

import { authenticate } from "../middleware/auth.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create-form",
  authenticate,
  adminOnly,
  createForm
);

router.get(
  "/forms",
  authenticate,
  adminOnly,
  getForms
);

router.get(
  "/submissions",
  authenticate,
  adminOnly,
  getAllSubmissions
);
router.put(
  "/edit/:id",
  authenticate,
  adminOnly,
  editForm
);

router.delete(
  "/delete/:id",
  authenticate,
  adminOnly,
  deleteForm
);
export default router;