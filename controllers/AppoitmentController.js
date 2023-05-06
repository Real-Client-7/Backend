import Appointment from "../models/Appointment.js";
import Patient from "../models/patientModel.js";
import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js'



export const AddAppointment=asyncHandler(async (req, res) =>{
    try {
      const { time, date, note, total, patient: patientId, treatments ,nbroftooth} = req.body;
      // Create new Appointment
      const newAppointment = new Appointment({
        date,
        note,
        total,
        patient: patientId,
        treatments,
        nbroftooth
      });
      const savedAppointment = await newAppointment.save();
  
      // Update the patient's appointments 
      const patient = await Patient.findById(patientId);
      patient.appointments.push(savedAppointment._id);
      await patient.save();
  
      //patient exists
      const existingDebt = await Debt.findOne({ patient: patientId });
  
      if (existingDebt) {
        existingDebt.rest = parseFloat(existingDebt.rest) + (+total);
        await existingDebt.save();      
      } else { 
        const newDebt = new Debt({
          rest: total,
          patient: patientId
        });
  
        await newDebt.save();
      }

  
      res.status(200).json({ response: savedAppointment });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
  
);
export const getAppoitment = asyncHandler(async(req, res)=> {
    try {
        const get = await Appointment.find({}).populate('patient').populate('treatments')
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)                                                                                                                                                                                                             
    }
});
//get appointment by id
export const getAppoitmentByID = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate('patient').populate('treatments')
    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404).send("Appointment not found");
    }
  });


export const deleteAppoitment =asyncHandler(async(req, res, next) =>{
    let id = req.params.id
    try {
        await Appointment.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Appointment delete success" })
    } catch (err) {
        res.status(400).json(err)
    }
});

export const UpdateAppoitment =asyncHandler(async(req, res, next) =>{
    let id = req.params.id
    let data = req.body
    try{
        await Appointment.updateOne({_id:id }, {$set:data})
        let response = await Appointment.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}
);

const appoitment = { AddAppointment, getAppoitment, deleteAppoitment, UpdateAppoitment ,getAppoitmentByID }

export default appoitment