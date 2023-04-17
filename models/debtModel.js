import mongoose from "mongoose";
const { Schema, model } = mongoose;

const debtSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  bill: {
    type: Schema.Types.ObjectId,
    ref: 'bill'
  }
},
{
    collection: "debt",
}


);

const Debt = model('Debt', debtSchema);
export default Debt;