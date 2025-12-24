// server/routes/loanRoutes.js
import express from "express";
import {
  getLoans,
  addLoan,
  deleteLoan,
  updateLoanStatus,
} from "../controllers/loanController.js";

const router = express.Router();

router.get("/", getLoans);
router.post("/", addLoan);
router.delete("/:id", deleteLoan);

export default router;
