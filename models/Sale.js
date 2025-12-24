import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    totalSale: {type: Number, required: true},
    totalExpense: {type: Number, required: true},
    profit: {type: Number, required: true},
},{timestamps: true})

export default mongoose.model("Sale", SaleSchema);