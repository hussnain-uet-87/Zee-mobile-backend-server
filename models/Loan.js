// server/models/Loan.js
import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    issueDate: { type: Date, required: true },
    reason: { type: String, required: false }, // new field
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
