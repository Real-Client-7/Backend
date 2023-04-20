import Appointment from "../models/Appointment.js";
import Patient from "../models/patientModel.js";
import asyncHandler from 'express-async-handler';

async function AddAppointment(req, res, next) {
  try {
    const data = req.body;
    const appointmentData = new Appointment(data);
    const savedAppointment = await appointmentData.save();

    // Update the patient's appointments array with the new appointment ID
    const patientId = data.patient;
    const patient = await Patient.findById(patientId);
    patient.appointments.push(savedAppointment._id);
    await patient.save();

    res.status(200).json({ response: savedAppointment });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function getAppoitment(req, res, next) {
    try {
        const get = await Appointment.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}
//get appointment by id
export const getAppoitmentByID = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id).populate('treatments');
    if (appointment) {
        res.json(appointment);
    } else {
        res.status(404);
        throw new Error("Appointment not found");
    }
  });


async function deleteAppoitment(req, res, next) {
    let id = req.params.id
    try {
        await Appointment.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Appointment delete success" })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function UpdateAppoitment(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await Appointment.updateOne({_id:id , $set:data})
        let response = await Appointment.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}

// const data= async()=>{
//      console.log( await Appointment.find({}))
//  }
//  data()

const appoitment = { AddAppointment, getAppoitment, deleteAppoitment, UpdateAppoitment ,getAppoitmentByID}

export default appoitment