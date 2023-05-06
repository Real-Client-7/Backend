import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const incomeSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
}, {
  collection: 'incomes',
  timestamps: true,

});

const Incomes = model('Incomes', incomeSchema);

export default Incomes;  