import mongoose from "mongoose";
const { Schema, model } = mongoose;

const debtSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  bill_id: {
    type: Number,
    required: true,
  }
},
{
    collection: "debt",
}


);

const Debt = model('Debt', debtSchema);
export default Debt;