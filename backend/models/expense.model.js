const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create username, type, description, amount, and date fields
const expenseSchema = new Schema(
    {
        username: { type: String, required: true },
        type: { type: String, enum: ["expense", "income"], required: true }, // 'expense' or 'income'
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
