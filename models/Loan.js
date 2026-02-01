// server/models/Loan.js
import mongoose from "mongoose";

// server/models/Loan.js
const loanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    issueDate: { type: Date, required: true },
    reason: { type: String, required: false },
    type: { type: String, enum: ["given", "taken"], default: "given" }, // Added this
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
