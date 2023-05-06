import Income from "../models/incomeModel.js";
import Patient from "../models/patientModel.js";
import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js'



export const addIncome = asyncHandler(async (req, res) => {
    try {
      const { amount, patient: patientId } = req.body;
  
      const existingPatient = await Patient.findById(patientId);
      if (!existingPatient) {
        return res.status(404).json({ message: `Patient with ID ${patientId} not found` });
      }
  
      const newIncome = new Income({
        amount,
        patient: patientId,
      });
  
      // Save new income object
      const savedIncome = await newIncome.save();
  
      // Update debt object for patient if it exists
      const existingDebt = await Debt.findOne({ patient: patientId });
      if (existingDebt) {
        existingDebt.rest = parseFloat(existingDebt.rest) - (+amount);
        await existingDebt.save();
      }
  
      res.status(200).json({ response: savedIncome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });
  



export const getIncome = asyncHandler(async (req, res) => {
  try {
    const incomes = await Income.find({})
      .populate('patient', 'first_name last_name')
      .exec();

    res.status(200).json({ data: incomes }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve income data' }); 
  }
});


export const updateIncome = asyncHandler(async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (income) {
      income.amount = req.body.amount ?? income.amount; 
      income.patient = req.body.patient ?? income.patient;
      income.patientName = req.body.patientName ?? income.patientName;
      const updatedIncome = await income.save();
      res.status(200).json(updatedIncome); 
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update income data' });
  }
});

export const deleteIncome = asyncHandler(async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (income) {
      res.status(200).json({ message: 'Income deleted successfully' }); 
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete income data' }); 
  }
});

const income = { addIncome, getIncome, updateIncome, deleteIncome };

export default income;
