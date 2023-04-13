import mongoose from "mongoose";
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  description : {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
},
{
    collection: "expense",
}


);

const Expense = model('Expense', expenseSchema);
export default Expense;