import Appointment from "../models/Appointment.js";
import Patient from "../models/patientModel.js";
import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js'

export const getDebt = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient', 'first_name last_name').exec();

    const appointmentsByPatient = {};
    appointments.forEach((appointment) => {
      const { patient } = appointment;
      if (!appointmentsByPatient[patient._id]) {
        appointmentsByPatient[patient._id] = {
          patient: patient._id,
          total: 0,
          paid: 0,
          rest: 0,
        };
      }
      const { rest } = appointment;
      appointmentsByPatient[patient._id].total += rest;
      appointmentsByPatient[patient._id].rest += rest;
    });

    const debts = [];
    for (const patientId in appointmentsByPatient) {
      const { patient, total, rest } = appointmentsByPatient[patientId];
      const patientDoc = await Patient.findById(patient).select('first_name last_name');
      if (patientDoc) {
        const existingDebt = await Debt.findOne({ patient: patientDoc._id });
        if (existingDebt) {
          existingDebt.amount = rest;
          await existingDebt.save();
          debts.push({ ...existingDebt.toObject(), first_name: patientDoc.first_name, last_name: patientDoc.last_name });
        } else if (rest > 0) {
          const debt = new Debt({ amount: rest, patient: patientDoc._id, patientName: `${patientDoc.first_name} ${patientDoc.last_name}` });
          await debt.save();
          debts.push({ ...debt.toObject(), first_name: patientDoc.first_name, last_name: patientDoc.last_name });
        }
      }
    }
    

    res.json(debts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

       

export const editDebt = asyncHandler(async (req, res) => {
    try {
        const debt = await Debt.findById(req.params.id);
        if (debt) {
            debt.amount = req.body.amount || debt.amount;
            debt.patient = req.body.patient || debt.patient;
            debt.patientName = req.body.patientName || debt.patientName;

            const updatedDebt = await debt.save();
            res.json(updatedDebt);
        } else {
            res.status(404);
            throw new Error('Debt not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

export const deleteDebt = asyncHandler(async (req, res) => {
    try {
        const debt = await Debt.findByIdAndDelete(req.params.id);
        if (debt) {
            res.json({ message: 'Debt deleted successfully' });
        } else {
            res.status(404);
            throw new Error('Debt not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

const debt = { getDebt, editDebt, deleteDebt}

export default debt