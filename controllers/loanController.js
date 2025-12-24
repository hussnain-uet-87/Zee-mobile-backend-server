// server/controllers/loanController.js
import Loan from "../models/Loan.js";

// GET all loans
export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new loan
export const addLoan = async (req, res) => {
  const { name, amount, issueDate, reason } = req.body;
  try {
    const loan = new Loan({ name, amount, issueDate, reason });
    const savedLoan = await loan.save();
    res.status(201).json(savedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE loan
export const deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH loan (for status)
export const updateLoanStatus = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    loan.status = req.body.status || loan.status;
    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
