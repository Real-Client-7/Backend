import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const debtSchema = new Schema({
  rest: {
    type: Number,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
}, {
  collection: 'debts',
});

const Debt = model('Debt', debtSchema);

export default Debt;