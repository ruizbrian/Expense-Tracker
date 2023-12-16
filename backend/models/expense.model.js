const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create username, expense, description, and date field
const expenseSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, required: true },
    expense: { type: String, required: true },
    date: {type: Date, required: true}
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;